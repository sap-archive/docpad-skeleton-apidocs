const config = {

  tempLocation: './tmp',
  skeletonDestination: './src',
  skeletonOutDestination: './out',
  placeholdersLocation: `./src/raw/placeholders`,
  docuUrl: process.env.docuURL || 'https://devportal.yaas.io',

  registry: {
    location: process.env.REGISTRY_LOCATION || 'remote',
    path: process.env.REGISTRY_PATH || 'ssh://git@stash.hybris.com:7999/wookiee/devportal_registry.git',
    fileName: 'docu_registry.json',
    branch: process.env.docuBranch || 'dev',
    shortVersionFileName: 'shrinkedRegistry.json',
    clonedRegistryFolder: 'registry'
  },

  docu: {
    clonedRepoFolder: 'docuSources',
    srcRepoDocuFolder: 'docu',
    metaFileName: 'meta-inf',
    folders: {
      mainDocu: 'files',
      getStart: 'gettingstarted',
      releaseNotes: 'release_notes',
      contentReuse: 'partials'
    }
  },

  generationResult: {
    srcLocation: 'ssh://git@stash.hybris.com:7999/wookiee/devportal_out.git',
    branch: process.env.docuBranch || 'dev',
    cloneLocation: 'latestResultRepo'
  },
  constantLocations: {
    apinotebooksLocation: './src/documents/apinotebooks',
    apinotebooksTestMatrixFile: './src/raw/matrix/apinotebook.txt'
  }
};

const out = config.skeletonOutDestination;

config.independentGeneration = {
  notUsedFiles: [`${out}/apiconsole`,
                `${out}/blog`,
                `${out}/bower_components`,
                `${out}/error`,
                `${out}/fonts`,
                `${out}/matrix`,
                `${out}/vendor`,
                `${out}/atom.xml`,
                `${out}/scripts`,
                `${out}/styles`,
                `${out}/fonts`,
                `${out}/rn/index.html`,
                `${out}/internal/rn/index.html`,
                `${out}/internal/temp`,
                `${out}/lunr`,
                `${out}/internal/rn/internal_atom.xml`,
                `!${out}/.git`]
};

config.minification = {
  js: [{
    src: [`${out}/scripts/vendor/jquery-2.1.4.min.js`, `${out}/scripts/vendor/bootstrap.min.js`, `${out}/scripts/vendor/select2.min.js`, `${out}/scripts//vendor/lscache.min.js`, `${out}/scripts/general/polyfills.js`,  `${out}/scripts/general/jws.min.js`, `${out}/build/plugins/embed-hash-persistence.js`],
    dest: `${out}/scripts/`,
    name: 'devportal-yaas-head.min.js'
  },
  {
    src: [`${out}/scripts/general/*.js`],
    dest: `${out}/scripts/`,
    name: 'devportal-yaas.min.js'
  }],
  css: [{
    src: [`${out}/styles/main.css`, `${out}/styles/components/globalnomodal.css`],
    dest: `${out}/styles/`,
    name: 'devportal-yaas.css',
    opts: {benchmark:true, noAdvanced:false}
  }],
  html: [{
    src: [`${out}/**/*.html`, `!${out}/error/error.html`],
    dest: `${out}/`,
    opts: {spare:true, conditionals:true, empty:true}
  }]
};

//add attributes to registry
config.registry.registryPath = `${config.tempLocation}/${config.registry.fileName}`;
config.registry.clonedRegistryFolderPath = `${config.tempLocation}/${config.registry.clonedRegistryFolder}`;
config.registry.shortRegistryPath = `${config.tempLocation}/${config.registry.shortVersionFileName}`;
config.registry.pathFolderWithClonedRegistry = `${config.tempLocation}/${config.registry.clonedRegistryFolder}/registry`;

//add attributes to docu
config.docu.clonedRepoFolderPath = `${config.tempLocation}/${config.docu.clonedRepoFolder}`;

//add attributes to generationResult
config.generationResult.clonedResultFolderPath = `${config.tempLocation}/${config.generationResult.cloneLocation}`;
config.generationResult.pathFolderWithClonedResult = `${config.generationResult.clonedResultFolderPath}`;

//add location with docu files
config.skeletonSrcDestination = `${config.skeletonDestination}/documents`;

module.exports = config;
