% Step 1: Load the dataset
datasetPath = 'C:\Users\91734\OneDrive\Desktop\tomato';
imds = imageDatastore(datasetPath, ...
    'IncludeSubfolders', true, ...
    'LabelSource', 'foldernames');

% Step 2: Split the dataset into training and validation sets
[imdsTrain, imdsValidation] = splitEachLabel(imds, 0.8, 'randomized');

% Step 3: Preprocess the images (resize to match VGG-16 input size)
inputSize = [224 224 3];
augmentedTrain = augmentedImageDatastore(inputSize, imdsTrain, ...
    'ColorPreprocessing', 'gray2rgb');
augmentedValidation = augmentedImageDatastore(inputSize, imdsValidation, ...
    'ColorPreprocessing', 'gray2rgb');

% Step 4: Load pre-trained VGG-16 model
net = vgg16;
net=vgg16('Weights','imagenet')
layers=vgg16('Weights','none')

% Step 5: Modify the network
% Remove the last layers and replace them with custom layers
layersTransfer = net.Layers(1:end-3); % Retain all layers except the last 3
numClasses = numel(categories(imdsTrain.Labels)); % Number of classes in dataset
layers = [
    layersTransfer
    fullyConnectedLayer(numClasses, 'WeightLearnRateFactor', 10, ...
    'BiasLearnRateFactor', 10)
    softmaxLayer
    classificationLayer];

% Step 6: Set training options
options = trainingOptions('sgdm', ...
    'MiniBatchSize', 32, ...
    'MaxEpochs', 10, ...
    'InitialLearnRate', 1e-4, ...
    'ValidationData', augmentedValidation, ...
    'ValidationFrequency', 5, ...
    'Verbose', true, ...
    'Plots', 'training-progress');

% Step 7: Train the model
netTransfer = trainNetwork(augmentedTrain, layers, options);

% Step 8: Evaluate the model
YPred = classify(netTransfer, augmentedValidation);
YValidation = imdsValidation.Labels;
accuracy = mean(YPred == YValidation);
disp(['Validation Accuracy: ', num2str(accuracy * 100), '%']);

% Step 9: Classify new images
newImage = imread('path_to_new_image.jpg');
newImageResized = imresize(newImage, inputSize(1:2));
label = classify(netTransfer, newImageResized);
disp(['Predicted Class: ', char(label)]);