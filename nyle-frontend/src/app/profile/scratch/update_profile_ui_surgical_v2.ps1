
$content = Get-Content "c:\dev\nyle-store\nyle-frontend\src\app\profile\page.js" -Raw

# 3. Replace Phone Number part
$target3 = '<p className="text-gray-900 font-semibold">+254 700 000 000</p>'
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
$target4 = '<p className="text-gray-900 font-semibold">English (US)</p>'
$replacement4 = '<p className="text-gray-900 font-semibold">{userData.language}</p>'

$content = $content -replace [regex]::Escape($target3), $replacement3
$content = $content -replace [regex]::Escape($target4), $replacement4

$content | Set-Content "c:\dev\nyle-store\nyle-frontend\src\app\profile\page.js"
