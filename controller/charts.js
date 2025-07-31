const ejs = require('ejs')
const _ = require("lodash")
const fs = require("fs")
const path = require("path")
const mkdirp = require('mkdirp')
const puppeteer = require('puppeteer');

// Auto-detect Chrome executable path for different architectures
function getChromiumExecutable() {
  const possiblePaths = [
    process.env.PUPPETEER_EXECUTABLE_PATH,
    '/usr/bin/chromium',
    '/usr/bin/chromium-browser',
    '/usr/bin/google-chrome',
    '/usr/bin/google-chrome-stable'
  ];

  for (const chromePath of possiblePaths) {
    if (chromePath && fs.existsSync(chromePath)) {
      console.log(`Using Chrome executable: ${chromePath}`);
      return chromePath;
    }
  }

  console.log('Using Puppeteer bundled Chromium');
  return undefined; // Let Puppeteer use its bundled Chromium
}

function getAbsPath(pathStr) {
  return path.join(__dirname, pathStr)
}

const distPath = getAbsPath('../dist');
const htmlDistPath = path.join(distPath, 'html')
mkdirp.sync(distPath)
mkdirp.sync(htmlDistPath)

const layoutHtmlStr = fs.readFileSync(getAbsPath(`../layout/echarts.ejs`), 'utf-8')
const wordcloudLayoutHtmlstr = fs.readFileSync(getAbsPath(`../layout/wordcloud.ejs`), 'utf-8')

const htmlStrMap = {
  wordcloud: wordcloudLayoutHtmlstr,
  china: layoutHtmlStr,
  line: layoutHtmlStr,
  bar: layoutHtmlStr,
  pie: layoutHtmlStr,
  radar: layoutHtmlStr
}



async function renderCharts(ctx, next) {
  var chartConfig = ctx.request.body.chartConfig;
  var chartWidth = Number(ctx.request.body.width);
  var chartHeight = Number(ctx.request.body.height);
  var version = Number(ctx.request.body.version)
  var type = ctx.request.body.type
  if (!_.isObject(chartConfig)) {
    ctx.throw(400, '`chartConfig` should be an object')
  }
  if (!_.isNumber(chartWidth)) {
    ctx.throw(400, '`chartWidth` should be a positive number')
  }
  if (!_.isNumber(chartHeight)) {
    ctx.throw(400, '`chartHeight` should be a positive number')
  }
  if (!_.isNumber(version)) {
    ctx.throw(400, '`version` should be a positive number')
  }

  chartWidth = chartWidth || 800;
  chartHeight = chartHeight || 600;
  const clipRect = { top: 0, left: 0, width: chartWidth, height: chartHeight };
  version = version || 5;
  let chartHtmlPath = path.join(htmlDistPath, `0.html`);
  let chartHtmlStr = ejs.render(htmlStrMap[type], { chartConfigStr: JSON.stringify(chartConfig), chartWidth, chartHeight, version })

  return new Promise((resolve, reject) => {
    fs.writeFile(chartHtmlPath, chartHtmlStr, async (err) => {
      if (err) {
        ctx.throw(500, err)
      }
      try {
        const pngBase64 = await htmlToBase64Img(chartHtmlPath, clipRect);
        ctx.body = "data:image/png;base64," + pngBase64
        resolve()
        //fs.unlink(chartHtmlPath, ()=>{});
      } catch (error) {
        ctx.throw(500, error)
      }
    })
  })

}


async function htmlToBase64Img(url, clipRect) {
  let browser;
  let page;
  try {
    const executablePath = getChromiumExecutable();
    const launchOptions = {
      headless: true,
      protocolTimeout: 60000,
      args: [
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--disable-dev-shm-usage',
        '--disable-extensions',
        '--disable-gpu'
      ]
    };

    // Add executablePath if detected
    if (executablePath) {
      launchOptions.executablePath = executablePath;
    }

    browser = await puppeteer.launch(launchOptions);
    page = await browser.newPage();
    await page.setViewport({
      width: clipRect.width,
      height: clipRect.height
    });
    await page.goto(`http://localhost:3000/0.html`, {
      waitUntil: 'networkidle0'
    });

    const screenshot = await page.screenshot({
      type: 'png',
      encoding: 'base64'
    });

    return screenshot;
  } catch (error) {
    throw new Error(error);
  } finally {
    if (page) await page.close();
    if (browser) await browser.close();
  }
}


module.exports = renderCharts
