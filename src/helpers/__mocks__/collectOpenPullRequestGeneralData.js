const collectOpenPullRequestGeneralData = async ({
  organization,
  repository,
  pageNumber = 1,
  accumulator,
}) => {
  if (organization === 'turingschool-examples' && repository === 'monster_shop_2005') {
    return [
      {
        'id': 516418880,
        'number': 122,
        'title': 'Refactorx2 routes',
        'author': 'GarrettCottrell',
      },
      {
        'id': 515002375,
        'number': 116,
        'title': 'Merchant Items, User Stories 42 through 48',
        'author': 'the-color-bliu',
      },
      {
        'id': 514433503,
        'number': 113,
        'title': 'Seeds',
        'author': 'BJSherman80',
      }
    ];
  }
};

export default collectOpenPullRequestGeneralData;
