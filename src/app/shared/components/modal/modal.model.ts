export type Modal = {
  showModal: boolean;
  popupName: string | null;
  modalWidth: number;
  modalTitleMsg: string;
  modalTitleDescription: string;
  showModalBody?: boolean;
  bodyContent?: string;
  hasFormControls?: boolean;
  formControlInfo?: {
    formControlName: string;
    validations: any[];
    defaultValue: any;
    placeHolder: string;
    isRequired: boolean;
    type: string;
    format: string | null;

  }[] | null;
  footerButtons: 
    {
      buttonType: string,
      buttonName: string,
      buttonId: string
    }[] | null
};
