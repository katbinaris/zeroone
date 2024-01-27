
const nano = {
    get(pid, tid, vid) {
        return new Promise((resolve, reject) => {
            resolve({ pid: pid, tid: tid, vid: vid, value: 0.0 });
        });
    },

    set(pid, tid, vid, value) {
        return new Promise((resolve, reject) => {
            resolve({ pid: pid, tid: tid, vid: vid, value: value });
        });
    },

    onValueReceived(listener) {
    }
};

export default nano;