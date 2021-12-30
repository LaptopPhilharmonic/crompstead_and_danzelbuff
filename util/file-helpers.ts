import fs from 'fs';
import path from 'path';

/**
 *  Get all files under a directory, including sub-directories.
 *  Thanks arthurDent on Stack Overflow: https://stackoverflow.com/a/66187152/17788501
 */
export const getFilesRecursively = (directory: string): string[] => {
    let files: string[] = [];
    const filesInDirectory = fs.readdirSync(directory);
    for (const file of filesInDirectory) {
        const absolute = path.join(directory, file);
        if (fs.statSync(absolute).isDirectory()) {
            files = files.concat(getFilesRecursively(absolute));
        } else {
            files.push(absolute);
        }
    }
    return files;
};