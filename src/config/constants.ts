export const regex: Record<string, RegExp> = {
  ALPHA_REGEX: /^[A-Za-z]+$/,
  NUMERIC_REGEX: /^[0-9]+$/,
  ALPHA_NUMERIC_REGEX: /^[A-Za-z0-9]+$/,
  EMAIL_REGEX: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
  LOWERCASE_REGEX: /^[a-z]+$/,
  UPPERCASE_REGEX: /^[A-Z]+$/,
  SPECIAL_CHARACTERS_REGEX: /^[!@#$%^&*(),.?":{}|<>]$/,
  WHITE_SPACE_REGEX: /\s+/,
  //DATE_REGEX: /^(?:(?:31(\/)(?:0?[13578]|1[02]))\1|(?:(?:29|30)(\/)(?:0?[13-9]|1[0-
  
  UUID: /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i,
  UUID_1: /^[0-9a-f]{8}-[0-9a-f]{4}-1[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i,
  UUID_2: /^[0-9a-f]{8}-[0-9a-f]{4}-2[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i,
  UUID_3: /^[0-9a-f]{8}-[0-9a-f]{4}-3[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i,
  UUID_4: /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i,
  UUID_5: /^[0-9a-f]{8}-[0-9a-f]{4}-5[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i,
}
