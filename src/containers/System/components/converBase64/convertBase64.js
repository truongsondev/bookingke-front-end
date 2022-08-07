function ConvertBase64Image(image) {
    if (!image) {
        return '';
    } else {
        return Buffer(image, 'base64').toString('binary');
    }
}

export default ConvertBase64Image;
