export default function getCookies(ck) {
    return ck.split(';').reduce((cookies, item) => {
      const [key, value] = item.split('=').map(c => c.trim());
      cookies[key] = decodeURIComponent(value);
      return cookies;
    }, {});
  }
  