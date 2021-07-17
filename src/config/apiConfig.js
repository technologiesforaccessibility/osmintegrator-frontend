const noTokenHeaders = () => {
  return {
    'Cache-Control': 'no-cache',
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
  };
};

const basicHeaders = () => {
  return {
    Authorization: 'Bearer ' + localStorage.token,
    'Cache-Control': 'no-cache',
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
  };
};

export {noTokenHeaders, basicHeaders};
