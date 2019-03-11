import cheerio from "cheerio";
export const getPBTagAndMagnetByTopic = async id => {
  let cors = "https://cors-anywhere.herokuapp.com/";
  let f = await fetch(cors + "thepiratebay.rocks/top/" + id);
  console.log(f.status);
  if (f.status !== 200) f = await fetch(cors + "pirateproxy.sh/top/" + id);
  if (f.status !== 200) f = await fetch(cors + "thepiratebay.red/top/" + id);
  if (f.status !== 200) f = await fetch(cors + "thepiratebay.org/top/" + id);
  if (!f.ok) {
    return;
  }

  const body = await f.text();
  const $ = cheerio.load(body);

  const s = [];
  let index = 0;
  $('a[title="Download this torrent using magnet"]').each((a, item) => {
    //console.log(item)
    const magnet = item.attribs.href;
    const fullTag = $(item)
      .parent()
      .text();
    let url = "";
    const url1 = $(item)
      .parent()
      .find(".detName a");
    if (url1.length) url = url1[0].attribs.href;
    // else console.log('hmm', item)
    const id = magnet.match(/(?![magnet:?xt=urn:btih:])(.*)(?=&dn)/)[0];

    const newItem = {
      id,
      magnet,
      url,
      fullTag,
      index
    };
    // console.log(newItem)
    index++;
    s.push(newItem);
  });
  return s;
};

export const setExpiry = (key, value, hours = 1) => {
  if (!value || !value.length) return;
  let today = new Date();
  today.setHours(today.getHours() + hours);
  localStorage.setItem(key + ".lastScrape", today.toISOString());
  localStorage.setItem(key, JSON.stringify(value));
};
export const isExpired = key => {
  const expire = localStorage.getItem(key + ".lastScrape");
  const value = localStorage.getItem(key);
  if (!expire || !value) return true;
  const expiryTime = new Date(expire);
  let today = new Date();
  console.log(key + " has Expired", today > expiryTime);
  return today > expiryTime;
};
