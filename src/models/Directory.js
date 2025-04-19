class Directory {
    constructor(directoryID, path, creationDate, isRoot, parentDirectory, childDirectories = [], files = []) {
        this.directoryID = directoryID;
        this.path = path;
        this.creationDate = creationDate;
        this.isRoot = isRoot;
        this.parentDirectory = parentDirectory;
        this.childDirectories = childDirectories;
        this.files = files;
    }
}

export default Directory;