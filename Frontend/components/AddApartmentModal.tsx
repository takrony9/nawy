"use client";

import * as Dialog from "@radix-ui/react-dialog";
import { Cross2Icon, PlusIcon } from "@radix-ui/react-icons";
import { useState } from "react";

export default function AddApartmentModal() {
  const [open, setOpen] = useState(false);
  const [images, setImages] = useState<File[]>([]);
  const [imageUrls, setImageUrls] = useState<string[]>([]);
  const [form, setForm] = useState({
    title: "",
    projectName: "",
    unitNumber: "",
    description: "",
    price: 0.0,
    area: 0.0,
    yearBuilt: 0,
    cityName: "",
    areaName: "",
    bedrooms: 1,
    bathrooms: 1,
    Images: [],
  });

  const handleNumberChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    if (/^-?\d*\.?\d{0,3}$/.test(value)) {
      setForm(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const newImages = Array.from(files);
      if (images.length + newImages.length > 2) {
        alert("Maximum 2 photos allowed");
        return;
      }
      
      // Create URLs for preview
      const urls = newImages.map(file => URL.createObjectURL(file));
      setImageUrls(prev => [...prev, ...urls]);
      setImages(prev => [...prev, ...newImages]);
    }
  };

  const removeImage = (index: number) => {
    URL.revokeObjectURL(imageUrls[index]); // Clean up URL
    setImages(prev => prev.filter((_, i) => i !== index));
    setImageUrls(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async () => {
    try {
      // Create FormData to handle file uploads
      const formData = new FormData();
      
      // Append all form fields
      Object.entries(form).forEach(([key, value]) => {
        if (key !== 'Images') {
          formData.append(key, value.toString());
        }
      });

      // Append images
      images.forEach((image) => {
        formData.append('images', image);
      });

      const res = await fetch("http://localhost:5000/api/apartments", {
        method: "POST",
        body: formData, // Send as FormData instead of JSON
      });
      
      if (!res.ok) throw new Error("Failed to add apartment");
      setOpen(false);
      location.reload();
    } catch (err) {
      console.error(err);
      alert("Failed to add apartment");
    }
  };

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger asChild>
        <button className="fixed bottom-6 right-6 bg-blue-600 hover:bg-blue-700 text-white p-4 rounded-full shadow-lg">
          <PlusIcon className="w-5 h-5" />
        </button>
      </Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Overlay className="bg-black/50 fixed inset-0" />
        <Dialog.Content className="bg-white fixed top-1/2 left-1/2 max-w-md w-[90vw] max-h-[90vh] overflow-y-auto -translate-x-1/2 -translate-y-1/2 rounded-xl p-6 shadow-xl space-y-4">
          <Dialog.Title className="text-lg font-semibold text-black">Add New Apartment</Dialog.Title>

          <div className="space-y-3">
            <input
              name="title"
              placeholder="Title"
              value={form.title}
              onChange={handleChange}
              className="w-full p-2 border rounded-md text-black placeholder:text-gray-500"
            />
            <input
              name="projectName"
              placeholder="Project Name"
              value={form.projectName}
              onChange={handleChange}
              className="w-full p-2 border rounded-md text-black placeholder:text-gray-500"
            />
            <input
              name="unitNumber"
              placeholder="Unit Number"
              value={form.unitNumber}
              onChange={handleChange}
              className="w-full p-2 border rounded-md text-black placeholder:text-gray-500"
            />
            <textarea
              name="description"
              placeholder="Description"
              value={form.description}
              onChange={handleChange}
              className="w-full p-2 border rounded-md text-black placeholder:text-gray-500"
            />
            <textarea
              name="cityName"
              placeholder="cityName"
              value={form.cityName}
              onChange={handleChange}
              className="w-full p-2 border rounded-md text-black placeholder:text-gray-500"
            />
            <textarea
              name="areaName"
              placeholder="areaName"
              value={form.areaName}
              onChange={handleChange}
              className="w-full p-2 border rounded-md text-black placeholder:text-gray-500"
            />
            <input
              type="number"
              name="yearBuilt"
              placeholder="Enter yearBuilt"
              value={form.yearBuilt}
              onChange={handleNumberChange}
              className="w-full p-2 border rounded-md text-black placeholder:text-gray-500"
            />
            <input
              type="number"
              name="bathrooms"
              placeholder="Enter bathrooms"
              value={form.bathrooms}
              onChange={handleNumberChange}
              className="w-full p-2 border rounded-md text-black placeholder:text-gray-500"
            />
            <input
              type="number"
              name="bedrooms"
              placeholder="Enter bedrooms"
              value={form.bedrooms}
              onChange={handleNumberChange}
              className="w-full p-2 border rounded-md text-black placeholder:text-gray-500"
            />
            <input
              type="number"
              name="area"
              placeholder="Enter area"
              value={form.area}
              onChange={handleNumberChange}
              step="any"
              className="w-full p-2 border rounded-md text-black placeholder:text-gray-500"
            />
            <input
              type="number"
              name="price"
              placeholder="Enter price"
              value={form.price}
              onChange={handleNumberChange}
              step="any"
              className="w-full p-2 border rounded-md text-black placeholder:text-gray-500"
            />

            {/* Image Upload Section */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium text-gray-700">
                  Upload Photos (Max 2)
                </label>
                <span className="text-sm text-gray-500">
                  {images.length}/2 photos
                </span>
              </div>
              
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                multiple
                disabled={images.length >= 2}
                className="w-full text-sm text-gray-500
                  file:mr-4 file:py-2 file:px-4
                  file:rounded-full file:border-0
                  file:text-sm file:font-semibold
                  file:bg-blue-50 file:text-blue-700
                  hover:file:bg-blue-100"
              />

              {/* Image Previews */}
              <div className="grid grid-cols-2 gap-2 mt-2">
                {imageUrls.map((url, index) => (
                  <div key={index} className="relative group">
                    <img
                      src={url}
                      alt={`Preview ${index + 1}`}
                      className="w-full h-24 object-cover rounded-md"
                    />
                    <button
                      onClick={() => removeImage(index)}
                      className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1
                        opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <Cross2Icon />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-2">
            <Dialog.Close asChild>
              <button className="text-gray-500 hover:text-black">Cancel</button>
            </Dialog.Close>
            <button
              onClick={handleSubmit}
              className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
            >
              Add
            </button>
          </div>

          <Dialog.Close asChild>
            <button className="absolute top-3 right-3 text-gray-500 hover:text-black">
              <Cross2Icon />
            </button>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
