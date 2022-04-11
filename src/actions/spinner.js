export const SPINNER = 'SPINNER';

export const spinner = (boolean) => {
  return {
    type: SPINNER,
    boolean,
  } 
}
