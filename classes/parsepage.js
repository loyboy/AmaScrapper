//const jsdom = require("jsdom");
//const { JSDOM } = jsdom;
//var HTMLParser = require('node-html-parser');
const cheerio = require('cheerio')
var fs = require('fs')

/*******************/
/** THIS CLASS HANDLES PARSING THE HTML PAGE FOR WEB SCRAPING  **/
/*******************/
class ParsePage {

    constructor(){}

/*************/
/** HELPERS **/
/*************/
/**
 * Part 1: Parse Amazon Page to get data
 */
  async parseAmazonPage (data, search, page, keyword) {
    const $ = cheerio.load(data)
    var text = $('.s-result-list').children().map(function(i, card) {
        return {
            link: $(card).find('span[data-component-type] a').attr('href'),
            book: $(card).find('span[data-component-type] img').attr('alt'),
            page: page,
            search: search,
            keyword: keyword,
            rank: i
          }        
    }).get()
   
   return Object.values(text);   
  }

}

module.exports = new ParsePage();