

const { Cheerio } = require('cheerio')
const axios = require('axios');
const cheerio = require('cheerio');
const fetch =require('node-fetch')


const searchCache={};

const searchUrl = 'https://www.receptix.us/us/';

const questionUrl='https://www.codeproject.com/Questions/'

function searchoffer(searchTerm){
  if(searchCache[searchTerm]){
    console.log('serving from cache',searchTerm)
    return Promise.resolve(searchCache[searchTerm]);
  }
  return fetch(`${searchUrl}${searchTerm}?as=2`)
  .then(response=>response.text())
  .then(body=>{
    const offers=[];
    const $ = cheerio.load(body);
    $('.job-item').each(function(i,element){

      const $element=$(element);

      const $title=$element.find('h2.itemHeader')
    //   const $qtid=$title.attr('href')
      const $qtlink=$element.find('a').attr('href')
    //   const $date=$element.find('span.modified')
      const $companyname=$element.find('div.css-tcffn8')
      const $place=$element.find('div.css-gbogy6')
    //   const $tags=$element.find('span.tags')
   
      const offer={
        // qtid:$qtid,
        title:$title.text(),
        qtlink:"https://www.receptix.us"+$qtlink,
        index1:$qtlink.indexOf("d=")+2,
        index2:$qtlink.indexOf("&hit"),
        id:$qtlink.substring($qtlink.indexOf("d=")+2,$qtlink.indexOf("&hit")),
        // date:$date.text(),
        companyname:$companyname.text(),
        place:$place.text(),
        // tags:$tags.text().replace('\n\n\t\n\t\n','').replace('\n\t\n\t\n\n\t\n','').replace('\n','').replace('/n','').replace('\t\n\t','').replace('\t','')

      };
      offers.push(offer);
  
    });
    return offers;
  });
}

////////////////////
// function searchoffer(searchTerm){
//   if(searchCache[searchTerm]){
//     console.log('serving from cache',searchTerm)
//     return Promise.resolve(searchCache[searchTerm]);
//   }
//   return fetch(`${searchUrl}${searchTerm}-jobs`)
//   .then(response=>response.text())
//   .then(body=>{
//     const offers=[];
//     const $ = cheerio.load(body);
//     $('.jobTuple').each(function(i,element){

//       const $element=$(element);

//       console.log(body)
//       const $title=$element.find('div.info a')
//     //   const $qtid=$title.attr('href').match(/Questions\/(.*)\//)[1]
//     //   const $qtlink=$element.find('a.title').attr('href')
//     //   const $date=$element.find('span.modified')
//     //   const $author=$element.find('span.author')
//     //   const $desc=$element.find('div.summary')
//     //   const $tags=$element.find('span.tags')
   
//       const offer={
//         // qtid:$qtid,
//         title:$title.text(),
//         // qtlink:$qtlink,
//         // date:$date.text(),
//         // author:$author.text(),
//         // desc:$desc.text(),
//         // tags:$tags.text().replace('\n\n\t\n\t\n','').replace('\n\t\n\t\n\n\t\n','').replace('\n','').replace('/n','').replace('\t\n\t','').replace('\t','')

//       };
//       offers.push(offer);
//   console.log($element)
//     });
//     return offers;
//   });
// }



// function getquestion(qtid,title){
//   return fetch(`${questionUrl}${qtid}/${title}`)
//     .then(response=>response.text())
//     .then(body=>{
//       const $ = cheerio.load(body)
//       const $title=$('.header h1').text()
//       const $content=$('.container-content div').text()
//       return {$content}
//     })
// }

// function searchoffer(searchTerm){
//     return fetch(`${searchUrl}${searchTerm}-jobs`)
//         .then(response=>response.text());
// }
// searchoffer('react')
//  .then(body=> {
//      console.log(body)
//  });


module.exports={
    searchoffer,
  
}
