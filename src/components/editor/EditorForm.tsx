import React from 'react';
import NameInput from './NameInput';
import UsernameInput from './UsernameInput';
import ContentTextarea from './ContentTextarea';
import ProfileImageUpload from './ProfileImageUpload';
import BackgroundImageUpload from './BackgroundImageUpload';
import ColorPicker from './ColorPicker';
import EmojiPickerButton from './EmojiPickerButton';
import QRCodeSettings from './QRCodeSettings';

const EditorForm: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="grid gap-6">
        <NameInput />
        <UsernameInput />
        <ContentTextarea />
      </div>
      
      <div className="border-t border-gray-200 pt-6">
        <h3 className="text-gray-700 text-sm font-medium mb-4">Customization</h3>
        <div className="grid sm:grid-cols-2 gap-4">
          <ProfileImageUpload />
          <BackgroundImageUpload />
          <ColorPicker />
          <EmojiPickerButton />
        </div>
      </div>
      
      <div className="border-t border-gray-200 pt-6">
        <QRCodeSettings />
      </div>
    </div>
  );
};

export default EditorForm;