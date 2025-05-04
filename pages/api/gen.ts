import type { NextApiRequest, NextApiResponse } from 'next';

const generateRandomString = (length: number, characters: string): string => {
  let result = '';
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
};

const generateRandomKey = (
  length = 64,
  characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
): string => {
  return generateRandomString(length, characters);
};

const generateRandomNumber = (length = 10): string => {
  return generateRandomString(length, '0123456789');
};

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { service } = req.query;

  const base_urls: { [key: string]: string } = {
    fluxus: 'https://flux.li/android/external/start.php?HWID={}',
    delta: 'https://gateway.platoboost.com/a/8?id={}',
    cryptic: 'https://gateway.platoboost.com/a/39097?id={}',
    evon: 'https://pandadevelopment.net/getkey?service=evon&hwid={}',
    cacti: 'https://gateway.platoboost.com/a/23344?id={}',
    hydrogen: 'https://gateway.platoboost.com/a/2569?id={}',
    relzhub: 'https://getkey.farrghii.com/redirect.php?hwid={}',
    vegax: 'https://pandadevelopment.net/getkey?service=vegax&hwid={}&provider=linkvertise',
    deltaios: 'https://gateway.platoboost.com/a/2?id={}',
    arceus: 'https://spdmteam.com/key-system-1?hwid={}&zone=Europe/Rome&os=android',
    trigon: 'https://trigonevo.fun/whitelist/?HWID={}-{}-{}-{}-{}',
  };

  const svc = Array.isArray(service) ? service[0] : service;

  if (!svc || !(svc in base_urls)) {
    return res.status(400).json({ error: 'Failed to generate key, service not found.' });
  }

  let modified_url = '';

  switch (svc) {
    case 'fluxus':
    case 'delta':
    case 'cryptic':
    case 'deltaios':
    case 'cacti':
      modified_url = base_urls[svc].replace('{}', generateRandomKey());
      break;
    case 'arceus':
      modified_url = base_urls[svc].replace('{}', generateRandomKey(16));
      break;
    case 'evon':
    case 'vegax':
      modified_url = base_urls[svc].replace('{}', generateRandomKey(36));
      break;
    case 'trigon':
      const r1 = generateRandomKey(6);
      const r2 = generateRandomKey(4);
      modified_url = base_urls[svc]
        .replace('{}', r1)
        .replace('{}', r2)
        .replace('{}', r2)
        .replace('{}', r2)
        .replace('{}', r1);
      break;
    case 'hydrogen':
      modified_url = base_urls[svc].replace('{}', generateRandomNumber());
      break;
    case 'relzhub':
      modified_url = base_urls[svc].replace('{}', generateRandomKey(20));
      break;
  }

  return res.status(200).json({ url: modified_url });
}
