import pool from "./connect.js";

const DEFAULT_USER_ID_SQL_TYPE = "VARCHAR(255)";

const resolveUserIdSqlType = (column = {}) => {
  const dataType = column.data_type;
  const maxLength = Number(column.character_maximum_length);

  switch (dataType) {
    case "character varying":
      return Number.isInteger(maxLength) && maxLength > 0
        ? `VARCHAR(${maxLength})`
        : DEFAULT_USER_ID_SQL_TYPE;
    case "text":
      return "TEXT";
    case "integer":
      return "INTEGER";
    case "bigint":
      return "BIGINT";
    case "uuid":
      return "UUID";
    default:
      return DEFAULT_USER_ID_SQL_TYPE;
  }
};

export const getUsersIdSqlType = async (queryable = pool) => {
  const { rows } = await queryable.query(
    `
      SELECT data_type, character_maximum_length
      FROM information_schema.columns
      WHERE table_schema = current_schema()
        AND table_name = 'users'
        AND column_name = 'id'
      LIMIT 1
    `
  );

  return resolveUserIdSqlType(rows[0]);
};

export const normalizeUserId = (value) => {
  if (value === undefined || value === null) {
    return null;
  }

  const normalized = String(value).trim();
  return normalized || null;
};
