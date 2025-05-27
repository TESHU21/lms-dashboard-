import React, { useState } from 'react';
import { Camera, Lock, Eye, EyeOff, LogOut, ChevronRight } from 'lucide-react'; // Assuming Lucide for icons
import { Button } from '@/components/ui/button'; // Adjust path as per your project
import { Input } from '@/components/ui/input';   // Adjust path as per your project
import { Label } from '@/components/ui/label';   // Adjust path as per your project
import { Avatar, AvatarFallback } from '@/components/ui/avatar'; // Adjust path

const Settings = () => {
    // State for form fields
    const [firstName, setFirstName] = useState('John');
    const [lastName, setLastName] = useState('Doe');
    const [email, setEmail] = useState('johndoe@gmail.com');
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');

    // State for password visibility
    const [showCurrentPassword, setShowCurrentPassword] = useState(false);
    const [showNewPassword, setShowNewPassword, ] = useState(false);

    // Placeholder for profile picture URL/File
    const [profilePicture, setProfilePicture] = useState(null); // Could be a file object or URL

    const handleProfileImageUpload = (event) => {
        // Handle file upload logic here
        const file = event.target.files[0];
        if (file) {
            setProfilePicture(file); // Or set a URL to display preview
            console.log('Image uploaded:', file.name);
            // In a real app, you'd send this to a backend storage service
        }
    };

    const handleUpdate = (e) => {
        e.preventDefault();
        console.log('Updating account...');
        console.log({
            firstName,
            lastName,
            email,
            currentPassword,
            newPassword,
            profilePicture
        });
        // Implement your API call to update user data here
    };

    const handleLogout = () => {
        console.log('Logging out...');
        // Implement your logout logic here (e.g., clear tokens, redirect)
    };

    return (
        <div className="min-h-screen w-full  bg-white  ">
                            <h1 className="text-2xl ml-[64px] mt-3  font-semibold text-gray-800 mb-6">Account</h1>

            <div className=" mx-[152px]  ">

                {/* Profile Picture Section */}
                <div className="flex items-center justify-between space-x-6 mb-8">
                    <div className='flex items-center'>
                    <div className="w-20 h-20 bg-blue-primary text-white font-bold text-3xl flex items-center justify-center rounded-full">
                        {profilePicture ? (
                            <img src={URL.createObjectURL(profilePicture)} alt="Profile" className="w-full h-full object-cover rounded-full" />
                        ) : (
                            <p>JD</p>
                        )}
                    </div>
                    <span className='ml-6'>Profile Picture</span>
                    </div>
                    <div className="relative">
                        <Input
                            id="profile-image-upload"
                            type="file"
                            accept="image/*"
                            className="absolute inset-0 opacity-0 cursor-pointer"
                            onChange={handleProfileImageUpload}
                        />
                        <Label
                            htmlFor="profile-image-upload"
                            className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 cursor-pointer"
                        >
                            <Camera className="h-5 w-5 mr-2" />
                            Upload image
                        </Label>
                    </div>
                </div>

                {/* Full Name Section */}
                <div className="mb-8">
                    <h2 className="text-lg font-medium text-gray-800 mb-2">Full name</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <Label htmlFor="first-name" className="sr-only">First name</Label>
                            <Input
                                id="first-name"
                                type="text"
                                placeholder="First name"
                                value={firstName}
                                onChange={(e) => setFirstName(e.target.value)}
                                className="w-full"
                            />
                        </div>
                        <div>
                            <Label htmlFor="last-name" className="sr-only">Last name</Label>
                            <Input
                                id="last-name"
                                type="text"
                                placeholder="Last name"
                                value={lastName}
                                onChange={(e) => setLastName(e.target.value)}
                                className="w-full"
                            />
                        </div>
                    </div>
                </div>

                {/* Email Section */}
                <div className="mb-8">
                    <h2 className="text-lg font-medium text-gray-800 mb-1">Email</h2>
                    <p className="text-sm text-gray-500 mb-4">Manage account email address</p>
                    <div>
                        <Label htmlFor="email" className="sr-only">Email</Label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <svg className="h-5 w-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"></path>
                                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"></path>
                                </svg>
                            </div>
                            <Input
                                id="email"
                                type="email"
                                placeholder="johndoe@gmail.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full pl-10"
                            />
                        </div>
                    </div>
                </div>

                {/* Password Section */}
                <div className="mb-8">
                    <h2 className="text-lg font-medium text-gray-800 mb-1">Password</h2>
                    <p className="text-sm text-gray-500 mb-4">Modify your current accounts</p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* Current Password */}
                        <div>
                            <Label htmlFor="current-password" className="sr-only">Current password</Label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Lock className="h-5 w-5 text-gray-400" />
                                </div>
                                <Input
                                    id="current-password"
                                    type={showCurrentPassword ? 'text' : 'password'}
                                    placeholder="Current password"
                                    value={currentPassword}
                                    onChange={(e) => setCurrentPassword(e.target.value)}
                                    className="w-full pl-10 pr-10"
                                />
                                <div
                                    className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
                                    onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                                >
                                    {showCurrentPassword ? <EyeOff className="h-5 w-5 text-gray-400" /> : <Eye className="h-5 w-5 text-gray-400" />}
                                </div>
                            </div>
                        </div>
                        {/* New Password */}
                        <div>
                            <Label htmlFor="new-password" className="sr-only">New password</Label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Lock className="h-5 w-5 text-gray-400" />
                                </div>
                                <Input
                                    id="new-password"
                                    type={showNewPassword ? 'text' : 'password'}
                                    placeholder="New password"
                                    value={newPassword}
                                    onChange={(e) => setNewPassword(e.target.value)}
                                    className="w-full pl-10 pr-10"
                                />
                                <div
                                    className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
                                    onClick={() => setShowNewPassword(!showNewPassword)}
                                >
                                    {showNewPassword ? <EyeOff className="h-5 w-5 text-gray-400" /> : <Eye className="h-5 w-5 text-gray-400" />}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="flex justify-start space-x-4 pt-4">
                    <Button
                        type="button"
                        onClick={handleLogout}
                        className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-gray-700 bg-gray-200 hover:bg-gray-300"
                    >
                        Logout
                        <ChevronRight className="ml-2 h-5 w-5" />
                    </Button>
                    <Button
                        type="submit"
                        onClick={handleUpdate}
                        className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700"
                    >
                        Update
                        <ChevronRight className="ml-2 h-5 w-5" />
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default Settings;