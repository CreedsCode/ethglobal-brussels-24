// SPDX-License-Identifier: MIT

pragma solidity >=0.8.2 <0.9.0;

import "fhevm/lib/TFHE.sol";

contract RandomPhotoFactory {
    mapping(address => address) public randomPhotoContracts;

    event RandomPhotoCreated(address indexed id, address indexed contractAddress);
    event RandomPhotoGen(address indexed id, uint16 result);

    /**
     * @dev Creates a new instance of RandomPhoto contract for a given ID.
     * @param id The ID of the collection.
     * @param photoN The number of photos to add to the new RandomPhoto contract.
     */
    function createRandomPhoto(address id, uint16 photoN) public {
        require(randomPhotoContracts[id] == address(0), "Collection with this ID already exists");

        RandomPhoto newRandomPhoto = new RandomPhoto();
        newRandomPhoto.addPhotos(photoN);

        randomPhotoContracts[id] = address(newRandomPhoto);

        emit RandomPhotoCreated(id, address(newRandomPhoto));
    }

    /**
     * @dev Gets the address of a RandomPhoto contract instance by its ID.
     * @param id The ID of the collection.
     * @return The address of the RandomPhoto contract instance.
     */
    function getRandomPhotoContract(address id) public view returns (address) {
        return randomPhotoContracts[id];
    }

    /**
     * @dev Calls the getRandomPhoto function in the specified RandomPhoto contract and returns its result.
     * @param id The ID of the collection.
     * @return The ID of the randomly selected photo.
     */
    function getRandomPhotoResult(address id) public returns (uint16) {
        require(randomPhotoContracts[id] != address(0), "Collection with this ID does not exist");

        RandomPhoto randomPhoto = RandomPhoto(randomPhotoContracts[id]);
        
        uint16 result = randomPhoto.getRandomPhoto();
        emit RandomPhotoGen(id, result);
        return result;
    }
}

contract RandomPhoto {
    struct Photo {
        uint16 id;
        bool isAvailable;
    }

    Photo[] public photos;
    Photo[] public availablePhotos;

    event RandomNumberGenerated(uint16 number);
    uint16 public result;

    /**
     * @dev Adds a specified number of photos to the contract.
     * @param photoN The number of photos to add.
     */
    function addPhotos(uint16 photoN) public {
        uint16 currentLength = uint16(photos.length);
        for (uint16 i = 0; i < photoN; i++) {
            photos.push(Photo({
                id: currentLength + i,
                isAvailable: true
            }));
        }
    }

    /**
     * @dev Generates a random number using the TFHE library.
     * @return A randomly generated uint16 number.
     */
    function randomNumber() public returns (uint16) {
        euint16 enumber = TFHE.randEuint16();
        uint16 rnd = TFHE.decrypt(enumber);
        emit RandomNumberGenerated(rnd);
        return rnd;
    }

    /**
     * @dev Selects a random photo from the available photos.
     * @return The ID of the selected random photo.
     */
    function getRandomPhoto() public returns (uint16) {
        updateAvailablePhotos();
        require(availablePhotos.length > 0, "No more photos available");

        uint16 availableRandomIndex = randomNumber() % uint16(availablePhotos.length);
        uint16 globalRandomIndex = availablePhotos[availableRandomIndex].id;

        // Mark the selected photo as unavailable
        photos[globalRandomIndex].isAvailable = false;

        result = globalRandomIndex;
        return globalRandomIndex;
    }

    /**
     * @dev Updates the list of available photos.
     */
    function updateAvailablePhotos() internal {
        delete availablePhotos;
        for (uint16 i = 0; i < photos.length; i++) {
            if (photos[i].isAvailable) {
                availablePhotos.push(photos[i]);
            }
        }
    }
}