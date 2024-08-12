import React from 'react';

const BlogPost = () => {
    const data = {
        id: 1,
        Owener: {
            id: 123,
            name: "Dilawar Jahangir",
            email: "dilawarjahangir2@gmail.com"
        },
        title: "His mother had always taught him",
        body: "His mother had always taught him not to ever think of himself as better than others. He'd tried to live by this motto. He never looked down on those who were less fortunate or who had less money than him. But the stupidity of the group of people he was talking to made him change his mind.",
        tags: ["history", "american", "crime"],
        replies: [
            {
                reply: "This is a thoughtful perspective. It’s important to remain humble.",
                email: "testing2@gmail.com",
                date: "2016-05-18T16:00:00Z"
            }
        ]
    };

    return (
        <div className="bg-gray-100 flex items-start justify-center p-6">
            <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
                <div className="p-6">
                    {/* Owner Details */}
                    <div className="mb-4">
                        <h2 className="text-lg font-semibold text-gray-800">Author Details:</h2>
                        <p className="text-gray-600"><span className="font-semibold">Name:</span> {data.Owener.name}</p>
                        <p className="text-gray-600"><span className="font-semibold">Email:</span> {data.Owener.email}</p>
                    </div>

                    {/* Title */}
                    <h1 className="text-2xl font-semibold text-gray-800 mb-4">{data.title}</h1>
                    
                    {/* Body */}
                    <p className="text-gray-700 mb-4">{data.body}</p>
                    
                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mb-4">
                        {data.tags.map(tag => (
                            <span
                                key={tag}
                                className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded-full"
                            >
                                {tag}
                            </span>
                        ))}
                    </div>
                    
                    {/* Replies */}
                    <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                        <h2 className="text-lg font-semibold text-gray-800 mb-2">Replies:</h2>
                        {data.replies.length > 0 ? (
                            data.replies.map((reply, index) => (
                                <div key={index} className="mb-4">
                                    <p className="text-gray-600 mb-1"><span className="font-semibold">Reply:</span> {reply.reply}</p>
                                    <p className="text-gray-600 mb-1"><span className="font-semibold">Email:</span> {reply.email}</p>
                                    <p className="text-gray-600"><span className="font-semibold">Date:</span> {new Date(reply.date).toLocaleString()}</p>
                                </div>
                            ))
                        ) : (
                            <p className="text-gray-600">No replies yet.</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BlogPost;
