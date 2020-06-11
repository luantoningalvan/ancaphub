/* eslint-disable prefer-template */
const censorEmail = (email) => {
  const pieces = email.split(/[.@]+/);

  const censoredEmail =
    pieces[0].charAt(0) +
    '*'.repeat(pieces[0].length - 2) +
    pieces[0].charAt(pieces[0].length - 1) +
    '@' +
    pieces[1].charAt(0) +
    '*'.repeat(pieces[1].length - 2) +
    pieces[1].charAt(pieces[1].length - 1) +
    '.' +
    pieces[2];

  return censoredEmail;
};

module.exports = censorEmail;
