export const operatorMap = {
  '=': 'is',
  '!=': 'is not',
  '>': 'is greater than',
  '<': 'is less than',
  '>=': 'is greater than or equal to',
  '<=': 'is less than or equal to',
  includes: 'includes',
  has: 'has',
}

export const operatorByType = {
  string: 'includes',
  email: 'includes',
  url: 'includes',
  references: 'has',
  set: 'has',
}

export const logicalOperatorsMap = {
  $and: 'AND',
  $or: 'OR',
  $not: 'NOT',
}
