
$content = Get-Content "c:\dev\nyle-store\nyle-frontend\src\app\profile\page.js" -Raw
# Using a simpler target that is easier to match
$target = '(?s)\{/\* Profile Info Details \*/\}.*?<div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">.*?<h2 className="text-xl font-black text-gray-900">Personal Information</h2>.*?<button className="text-blue-600 font-bold text-sm hover:underline">Edit Info</button>.*?<p className="\+254 700 000 000">.*?</p>.*?</div>\s+</div>'

# Actually, I'll just use a more surgical approach.
# Replace the header and the phone number part separately.

# 1. Replace the header/button part
$target1 = '<button className="text-blue-600 font-bold text-sm hover:underline">Edit Info</button>'
$replacement1 = '{!isEditing ? (
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
                                            )}'

# 2. Replace Full Name part
$target2 = '<p className="text-gray-900 font-semibold">{session.user.name}</p>'
$replacement2 = '{isEditing ? (
                                                    <input 
                                                        type="text"
                                                        value={editForm.name}
                                                        onChange={(e) => setEditForm({...editForm, name: e.target.value})}
                                                        className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                                                    />
                                                ) : (
                                                    <p className="text-gray-900 font-semibold">{session.user.name}</p>
                                                )}'

# 3. Replace Phone Number part
$target3 = '<p className="text-gray-900 font-semibold">\+254 700 000 000</p>'
$replacement3 = '{isEditing ? (
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
                                                )}'

# 4. Replace Language part
$target4 = '<p className="text-gray-900 font-semibold">English \(US\)</p>'
$replacement4 = '<p className="text-gray-900 font-semibold">{userData.language}</p>'

$content = $content -replace [regex]::Escape($target1), $replacement1
$content = $content -replace [regex]::Escape($target2), $replacement2
$content = $content -replace [regex]::Escape($target3), $replacement3
$content = $content -replace [regex]::Escape($target4), $replacement4

$content | Set-Content "c:\dev\nyle-store\nyle-frontend\src\app\profile\page.js"
