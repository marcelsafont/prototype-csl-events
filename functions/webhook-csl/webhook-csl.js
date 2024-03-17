// Docs on event and context https://docs.netlify.com/functions/build/#code-your-function-2
const fetch = (...args) => import(`node-fetch`).then(({ default: fetch }) => fetch(...args));
const handler = async (event) => {
  try {
    const requestRebuild = await fetch('https://api.netlify.com/build_hooks/65f6ba06846e7c618ca4227d', {
      method: 'POST',
      body: JSON.stringify({}),
    
    });
    //const responseRebuild = await requestRebuild.text();
    // console.log(responseRebuild);
  } catch (error) {
    return { statusCode: 500, body: error.toString() }
  }
}

module.exports = { handler }
