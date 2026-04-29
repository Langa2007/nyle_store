
$content = Get-Content "c:\dev\nyle-store\nyle-frontend\src\app\profile\page.js" -Raw
$target = '                                    {/* Profile Info Details */}
                                    <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
                                        <div className="px-8 py-6 border-b border-gray-50 flex items-center justify-between">
                                            <h2 className="text-xl font-black text-gray-900">Personal Information</h2>
                                            <button className="text-blue-600 font-bold text-sm hover:underline">Edit Info</button>
                                        </div>
                                        <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-8">
                                            <div>
                                                <p className="text-xs text-gray-400 font-bold uppercase tracking-wider mb-1">Full Name</p>
                                                <p className="text-gray-900 font-semibold">{session.user.name}</p>
                                            </div>
                                            <div>
                                                <p className="text-xs text-gray-400 font-bold uppercase tracking-wider mb-1">Email Address</p>
                                                <p className="text-gray-900 font-semibold">{session.user.email}</p>
                                            </div>
                                            <div>
                                                <p className="text-xs text-gray-400 font-bold uppercase tracking-wider mb-1">Phone Number</p>
                                                <p className="text-gray-900 font-semibold">+254 700 000 000</p>
                                            </div>
                                            <div>
                                                <p className="text-xs text-gray-400 font-bold uppercase tracking-wider mb-1">Default Language</p>
                                                <p className="text-gray-900 font-semibold">English (US)</p>
                                            </div>
                                        </div>
                                    </div>'

$replacement = '                                    {/* Profile Info Details */}
                                    <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
                                        <div className="px-8 py-6 border-b border-gray-50 flex items-center justify-between">
                                            <h2 className="text-xl font-black text-gray-900">Personal Information</h2>
                                            {!isEditing ? (
                                                <button 
                                                    onClick={() => setIsEditing(true)}
                                                    className="text-blue-600 font-bold text-sm hover:underline"
                                                >
                                                    Edit Info
                                                </button>
                                            ) : (
                                                <div className="flex gap-3">
                                                    <button 
                                                        disabled={updatingProfile}
                                                        onClick={async () => {
                                                            setUpdatingProfile(true);
                                                            try {
                                                                const authToken = getAuthToken();
                                                                const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/users/profile`, {
                                                                    method: "PUT",
                                                                    headers: {
                                                                        "Content-Type": "application/json",
                                                                        "Authorization": `Bearer ${authToken}`
                                                                    },
                                                                    body: JSON.stringify(editForm)
                                                                });
                                                                if (res.ok) {
                                                                    toast.success("Profile updated!");
                                                                    setUserData(prev => ({ ...prev, phone: editForm.phone }));
                                                                    setIsEditing(false);
                                                                } else {
                                                                    toast.error("Failed to update profile");
                                                                }
                                                            } catch (err) {
                                                                toast.error("Network error");
                                                            } finally {
                                                                setUpdatingProfile(false);
                                                            }
                                                        }}
                                                        className="text-blue-600 font-bold text-sm hover:underline disabled:opacity-50"
                                                    >
                                                        {updatingProfile ? "Saving..." : "Save"}
                                                    </button>
                                                    <button 
                                                        onClick={() => setIsEditing(false)}
                                                        className="text-gray-400 font-bold text-sm hover:underline"
                                                    >
                                                        Cancel
                                                    </button>
                                                </div>
                                            )}
                                        </div>
                                        <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-8">
                                            <div>
                                                <p className="text-xs text-gray-400 font-bold uppercase tracking-wider mb-1">Full Name</p>
                                                {isEditing ? (
                                                    <input 
                                                        type="text"
                                                        value={editForm.name}
                                                        onChange={(e) => setEditForm({...editForm, name: e.target.value})}
                                                        className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                                                    />
                                                ) : (
                                                    <p className="text-gray-900 font-semibold">{session.user.name}</p>
                                                )}
                                            </div>
                                            <div>
                                                <p className="text-xs text-gray-400 font-bold uppercase tracking-wider mb-1">Email Address</p>
                                                <p className="text-gray-900 font-semibold">{session.user.email}</p>
                                            </div>
                                            <div>
                                                <p className="text-xs text-gray-400 font-bold uppercase tracking-wider mb-1">Phone Number</p>
                                                {isEditing ? (
                                                    <input 
                                                        type="text"
                                                        placeholder="e.g. +254 700 000 000"
                                                        value={editForm.phone}
                                                        onChange={(e) => setEditForm({...editForm, phone: e.target.value})}
                                                        className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                                                    />
                                                ) : (
                                                    <p className={`font-semibold ${!userData.phone ? "text-gray-400 italic" : "text-gray-900"}`}>
                                                        {userData.phone || "number here"}
                                                    </p>
                                                )}
                                            </div>
                                            <div>
                                                <p className="text-xs text-gray-400 font-bold uppercase tracking-wider mb-1">Default Language</p>
                                                <p className="text-gray-900 font-semibold">{userData.language}</p>
                                            </div>
                                        </div>
                                    </div>'

$newContent = $content.Replace($target, $replacement)
$newContent | Set-Content "c:\dev\nyle-store\nyle-frontend\src\app\profile\page.js"
