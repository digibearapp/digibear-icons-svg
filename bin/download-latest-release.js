const { downloadRelease } = require('@terascope/fetch-github-release');

const USER = 'digibearapp';
const REPO = 'digibear-home';
const OUTPUT_DIR = 'temp';
const LEAVE_ZIPPED = false;
const DISABLE_LOGGING = false;

// Define a function to filter releases.
function filterRelease(release) {
  // Filter out prereleases.
  return release.prerelease === false;
}

// Define a function to filter assets.
function filterAsset(asset) {
  return true;
}

async function downloadDbIconsRelease() {
  return new Promise((resolve, reject) => {
    downloadRelease(USER, REPO, OUTPUT_DIR, filterRelease, filterAsset, LEAVE_ZIPPED, DISABLE_LOGGING)
      .then(function () {
        resolve('Successfully downloaded latest digibear-icons release.');
      })
      .catch(function (err) {
        reject('Could not download latest digibear-icons release.');
      });
  });
}

module.exports = { downloadDbIconsRelease };