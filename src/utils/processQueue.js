const processQueue = async (messageQueue, setProcessing) => {
	if (messageQueue.current.length > 0) {
		setProcessing(true);
		const callback = messageQueue.current.shift(); // Get the first message in the queue
		callback();
		processQueue(); // Recursively process the next message
	} else {
		setProcessing(false); // No more messages to process
	}
};

export default processQueue;
