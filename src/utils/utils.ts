import { IncomingMessage } from 'http';
import { IUserWithoutId } from '../types';

function getReqData(req: IncomingMessage): Promise<string> {
  return new Promise((resolve, reject) => {
      try {
          let body = "";
          req.on("data", (chunk) => {
              body += chunk.toString();
          });

          req.on("end", () => {
              resolve(body);
          });
      } catch (error) {
          reject(error);
      }
  });
}

function validateData({ username, age, hobbies }: IUserWithoutId) {
  if (typeof username !== 'string') {
    return false;
  }

  if (typeof age !== 'number') {
    return false;
  }

  if (!Array.isArray(hobbies)) {
    return false;
  }

  if (hobbies.length) {
    const isArrayOfStrings = hobbies.every((elem) => typeof elem === 'string');
    if (!isArrayOfStrings) {
      return false;
    }
  }

  return Boolean(username && age && hobbies)
}

export { getReqData, validateData };