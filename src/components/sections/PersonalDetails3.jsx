/* eslint-disable react/prop-types */
import InputComponent from '../InputComponent';
import SocialLinks from './subSections/SocialLinks';
import SaveButton from '../subComponents/SaveButton';
import { MdAddLink } from "react-icons/md";
import { RiDeleteBin5Fill } from "react-icons/ri";

const PersonalDetails3 = (props) => {
    const { setCurrValues, currValues, handleTitleChange } = props;

    const handleInputChange = (e) => {
        setCurrValues((prev) => ({
            ...prev,
            detail: {
                ...prev.detail,
                [e.target.name]: e.target.value
            }
        }));
    };

    const handlePhotoChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setCurrValues((prev) => ({
                    ...prev,
                    detail: {
                        ...prev.detail,
                        photo: reader.result
                    }
                }));
            };
            reader.readAsDataURL(file);
        }
    };

    const handleAddLinks = () => {
        const newLink = { title: "", linkUrl: "" };
        setCurrValues((prev) => ({
            ...prev,
            links: [...prev.links, newLink]
        }));
    };

    const handleRemoveLinks = (index) => {
        const filteredLinks = currValues.links.filter((_, idx) => idx !== index);
        setCurrValues((prev) => ({ ...prev, links: filteredLinks }));
    };

    return (
        <form onSubmit={(e) => props.handleSave(e)}>
            <InputComponent
                onChange={handleTitleChange}
                value={currValues.title}
                type="text"
                label="Title"
                name="title"
                id="title"
                placeholder="Section Title"
            />

            {/* 👇 Photo Upload */}
            <div className="mb-4">
                <label className="block font-medium mb-1">Upload Profile Photo</label>
                <input
                    type="file"
                    accept="image/*"
                    onChange={handlePhotoChange}
                    className="block w-full"
                />
                {currValues.detail?.photo && (
                    <img
                        src={currValues.detail.photo}
                        alt="Preview"
                        className="mt-2 w-24 h-24 object-cover rounded-full border"
                    />
                )}
            </div>

            <InputComponent onChange={handleInputChange} value={currValues.detail?.firstName} type="text" label="First Name" name="firstName" placeholder="e.g. Aniket" />
            <InputComponent onChange={handleInputChange} value={currValues.detail?.lastName} type="text" label="Last Name" name="lastName" placeholder="e.g. Gupta" />
            <InputComponent onChange={handleInputChange} value={currValues.detail?.jobTitle} type="text" label="Job Title" name="jobTitle" placeholder="e.g. Frontend Developer" />
            <InputComponent onChange={handleInputChange} value={currValues.detail?.phone} type="tel" label="Phone" name="phone" placeholder="e.g. +91 51501-61846" />
            <InputComponent onChange={handleInputChange} value={currValues.detail?.email} type="email" label="Email" name="email" placeholder="e.g. abc@gmail.com" />
            <InputComponent onChange={handleInputChange} value={currValues.detail?.city} type="text" label="City" name="city" placeholder="e.g. Ludhiana" />
            <InputComponent onChange={handleInputChange} value={currValues.detail?.state} type="text" label="State" name="state" placeholder="e.g. Punjab" />
            <InputComponent onChange={handleInputChange} value={currValues.detail?.country} type="text" label="Country" name="country" placeholder="e.g. India" />

            {currValues.links?.map((elem, index) => (
                <div key={index} className="w-full flex items-center gap-2 my-2">
                    <SocialLinks setCurrValues={setCurrValues} currValues={currValues} index={index} />
                    <RiDeleteBin5Fill
                        onClick={() => handleRemoveLinks(index)}
                        size={20}
                        className="text-red-600 cursor-pointer"
                        title="Remove Link"
                    />
                </div>
            ))}

            <div className="my-2">
                <label
                    onClick={handleAddLinks}
                    className="flex items-center gap-2 text-pink-600 cursor-pointer font-semibold"
                >
                    <MdAddLink size={24} /> Add Social Links
                </label>
            </div>

            <SaveButton />
        </form>
    );
};

export default PersonalDetails3;
