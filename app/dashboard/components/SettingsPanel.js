import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, Button } from '../../components/ui';

const SettingsPanel = ({ isOpen, onClose }) => (
  <Dialog open={isOpen} onOpenChange={onClose}>
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Profile Settings</DialogTitle>
        <DialogDescription>Update your profile information here.</DialogDescription>
      </DialogHeader>
      <Button onClick={onClose}>Save Changes</Button>
    </DialogContent>
  </Dialog>
);

export default SettingsPanel;