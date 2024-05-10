import type { Either } from "./result";
import { left, right } from "./result";

export const extractTemplate = (data: string): Either<string> => {
  const regex = /<template>(.*?)<\/template>/gs;
  const match = data.match(regex);
  const templateContent = match ? match[0] : null;

  if(!templateContent) {
    return left('Tempolate parsing error');
  }

  return right(templateContent.replace('<template>','').replace('</template>', '').trim());
}

export const extractStyle = (data: string): Either<string> => {
  const regex = /<style>(.*?)<\/style>/gs;
  const match = data.match(regex);
  const styleContent = match ? match[0] : null;
  
  if(!styleContent) {
    return left('Style parsing error');
  }

  return right(styleContent.replace('<style>','').replace('</style>','').replace(/\n/g, ''));
}