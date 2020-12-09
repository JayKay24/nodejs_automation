import { BitlyClient } from "bitly";
import colors from "colors";

import { BITLY_TOKEN } from "../../data/018/config.json";

const { red, green } = colors;
const STATUS_CODE_OK = 200;
const bitly = new BitlyClient(BITLY_TOKEN);

const [, , ...args] = process.argv;
const [urlToShorten] = args;

const expression = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_+.~#?&//=]*)/gi;

const regex = new RegExp(expression);

if (urlToShorten === undefined || !urlToShorten.match(regex)) {
  console.log(
    red("Please pass a string in URL form, e.g 'http://www.opencanvas.co.uk'")
  );
  process.exit(0);
}

bitly
  .shorten(urlToShorten)
  .then((response) => {
    const { link } = response;
    console.log(response);
    console.log(green(`Shortened URL is: ${link}`));
  })
  .catch((err) => console.error(err));
