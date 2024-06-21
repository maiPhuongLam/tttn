import bcrypt from 'bcrypt';

export const hash = async (input: string): Promise<string> => {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(input, salt);
};

export const compare = async (input: string, hashString: string): Promise<boolean> => {
  return await bcrypt.compare(input, hashString);
};
