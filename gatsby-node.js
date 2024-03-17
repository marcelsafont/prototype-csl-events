const fetch = (...args) => import(`node-fetch`).then(({ default: fetch }) => fetch(...args));

// node source from Hubspot
exports.sourceNodes = async ({ actions: { createNode }, createContentDigest }) => {

  const clientId = 'eiAg3T8403aPPi5woNvWlKVYWBLQywdbT7JzMgHNaAM';
  const clientSecret = 'UqYnMlNdPGaCilswfI_zg8C1tDDL8ZazwVrbrGrcxtM';
  const credentials = `${clientId}:${clientSecret}`;
  const encodedCredentials = Buffer.from(credentials).toString('base64');

  const accessToken = await fetch('https://test1.eucontrolshift.app/oauth/token?grant_type=client_credentials', {
    method: 'POST',
      headers: {
        Authorization: `Basic ${encodedCredentials}`,
      'Content-Type': 'application/x-www-form-urlencoded'
      },
  });

  const recievedToken = await accessToken.json();

  const result = await fetch(`https://test1.eucontrolshift.app/api/v1/events?access_token=${recievedToken.access_token}`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
  });

  const resultData = await result.json();
  for (const event of resultData.events) {
    createNode({
      ...event,
      id: event.slug,
      title: event.title,
      internal: {
        type: 'ExternalEvent',
        contentDigest: createContentDigest(event),
      },
    });
  }
}