

const nanodevices = {
    list() {
        return [];
    },

    async connect(devicename) {
        return true;
    },

    async disconnect() {
        return true;
    },

    onAttach(listener) {
    },
    
    onDetach(listener) {
    }
};

export default nanodevices;
