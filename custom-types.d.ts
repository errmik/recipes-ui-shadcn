type LoginError = {
  success: boolean;
  msg?: string | null | undefined;
  code?: string | null | undefined;
  name?: string | null | undefined;
  email?: string | null | undefined;
};

type SignupError = {
  success: boolean;
  msg?: string | null | undefined;
  code?: string | null | undefined;
  name?: string | null | undefined;
  email?: string | null | undefined;
  errors?: Record<string, string> | null | undefined;
};

type LoginSuccessData = {
  success: boolean;
  msg: string;
  code: string;
  accessToken: string | null | undefined;
  refreshToken?: string | null | undefined;
  user: {
    userId: string;
    name: string;
    email: string;
    avatar: string;
  };
};

type RefreshTokenSuccessData = {
  success: boolean;
  code: string;
  msg: string;
  userId: user._id;
  name: user.name;
  email: user.email;
  accessToken: string | null | undefined;
};

type Ingredient = {
  _id: string;
  alcoholic: boolean | undefined | null;
  name: {
    [key: string]: string | undefined | null;
    fr: string | undefined | null;
    en: string | undefined | null;
    es: string | undefined | null;
    ca: string | undefined | null;
    de: string | undefined | null;
    el: string | undefined | null;
    it: string | undefined | null;
    nl: string | undefined | null;
    tr: string | undefined | null;
    pt: string | undefined | null;
    ru: string | undefined | null;
    zh: string | undefined | null;
  };
  description: {
    [key: string]: string | undefined | null;
    fr: string | undefined | null;
    en: string | undefined | null;
    es: string | undefined | null;
    ca: string | undefined | null;
    de: string | undefined | null;
    el: string | undefined | null;
    it: string | undefined | null;
    nl: string | undefined | null;
    tr: string | undefined | null;
    pt: string | undefined | null;
    ru: string | undefined | null;
    zh: string | undefined | null;
  };
  photo: string;
  calories: Number | undefined; //in kcal
  carbs: Number | undefined; //in grams
  protein: Number | undefined; //in grams
  fat: Number | undefined; //in grams
  cholesterol: Number | undefined; //in milligrams
  sugar: Number | undefined; //in grams
  sodium: Number | undefined; //in milligrams
  fiber: Number | undefined; //in grams
  createdDate: Date;
};
