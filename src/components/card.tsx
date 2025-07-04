interface CardProps {
  name: string;
  image: string;
}

export function Card({ name, image }: CardProps) {
  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200 max-w-80">
      <div className="w-full h-48 overflow-hidden">
        {image && <img src={getImageUrl(image)} alt={name} className="w-full h-full object-cover" />}
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-900">{name}</h3>
      </div>
    </div>
  );
}

function getImageUrl(img: string) {
  if (!img) return '';
  const image = img.split('ipfs://');
  if (image.length == 2) {
    return `http://gateway.lighthouse.storage/ipfs/${image[1]}`;
  } else {
    return img;
  }
}
