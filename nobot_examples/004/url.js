const [, , ...args] = process.argv;
const [urlEntered] = args;

if (urlEntered === undefined) {
  console.error(
    "Please pass a URL e.g https://www.google.co.uk/search?q=stranger+things"
  );
  process.exit(0);
}

const { protocol, host, searchParams, href } = new URL(urlEntered);
console.log(`Using protocol: ${protocol}`);
console.log(`Host: ${host}`);
console.log(`Query: ${searchParams}`);
console.log(`HREF: ${href}`);
