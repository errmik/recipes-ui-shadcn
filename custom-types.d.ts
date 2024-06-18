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
