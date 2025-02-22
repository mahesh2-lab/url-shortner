import React, { useState } from "react";
import { QRCodeCanvas } from "qrcode.react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { FaCopy, FaShareAlt } from "react-icons/fa";

const templates = {
  default: "bg-white text-black",
  dark: "bg-gray-800 text-white",
  colorful: "bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 text-white",
};

const ShareableLinkPage = ({ user, template = "default" }) => {
  const [copied, setCopied] = useState(false);
  const shareableUrl = `https://yourdomain.com/u/${user.username}`;
  const templateClass = templates[template] || templates.default;

  return (
    <div className={`flex flex-col items-center p-6 min-h-screen ${templateClass}`}>
      <div className="p-6 rounded-lg shadow-lg text-center">
        <h2 className="text-2xl font-bold">{user.name}'s Links</h2>
        <p className="text-gray-600">{user.bio}</p>
        
        <div className="mt-4 space-y-2">
          {user.links.map((link, index) => (
            <a
              key={index}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="block p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              {link.title}
            </a>
          ))}
        </div>

        <div className="mt-6 flex flex-col items-center">
          <QRCodeCanvas value={shareableUrl} size={128} />
          <p className="text-gray-500 text-sm mt-2">Scan to visit</p>
        </div>

        <div className="mt-4 flex gap-3">
          <CopyToClipboard text={shareableUrl} onCopy={() => setCopied(true)}>
            <button className="flex items-center bg-gray-800 text-white px-4 py-2 rounded hover:bg-gray-900">
              <FaCopy className="mr-2" /> {copied ? "Copied!" : "Copy Link"}
            </button>
          </CopyToClipboard>
          
          <button className="flex items-center bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
            <FaShareAlt className="mr-2" /> Share
          </button>
        </div>
      </div>
    </div>
  );
};

export default ShareableLinkPage;
