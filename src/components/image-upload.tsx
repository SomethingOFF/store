"use client";
import { ImagePlus, Trash } from "lucide-react";
import React from "react";
import { Button } from "./ui/button";
import Image from "next/image";
import { CldUploadWidget } from "next-cloudinary";
interface ImageUploadProps {
  disabled: boolean;
  onChange: (value: string) => void;
  onRemove: (value: string) => void;
  value: string[];
}

const ImageUpload: React.FC<ImageUploadProps> = ({
  disabled,
  onChange,
  onRemove,
  value,
}) => {
  const onUpload = (result: any) => {
    onChange(result.info.secure_url);
  };
  return (
    <div>
      <div className="mb-4 flex items-center gap-4">
        {value.map((url) => (
          <div
            key={url}
            className="relative w-[200px] aspect-square rouned-md overflow-hidden"
          >
            <div className="z-10 absolute top-2 right-2">
              <Button type="button" variant={"destructive"} size={"icon"} onClick={() => onRemove(url)}>
                <Trash className="w-4 h-4" />
              </Button>
            </div>
            <Image
              src={url}
              className="object-cover w-full h-full"
              alt="Image"
              width={100}
              height={100}
            />
          </div>
        ))}
      </div>
      <CldUploadWidget onUpload={onUpload} uploadPreset="psrszdg2">
        {({ open }) => {
          const onClick = () => {
            open();
          };
          return (
            <Button
              type="button"
              disabled={disabled}
              variant={"secondary"}
              onClick={onClick}
            >
              <ImagePlus className="h-4 w-4 mr-2" />
              Upload a new Image
            </Button>
          );
        }}
      </CldUploadWidget>
    </div>
  );
};

export default ImageUpload;
