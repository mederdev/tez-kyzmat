export interface Service {
  _id: string;
  name: string;
  category: string;
  description: string;
  ownerName: string;
  contact: string;
  whatsapp: string;
  location: string;
  locationName: string;
  district: string | null;
  districtName: string | null;
  price: string;
  available: boolean;
  images: string[];
  createdAt: string;
  updatedAt: string;
  ownerId: string | null;
}

export interface Category {
  id: ServiceCategory;
  name: string;
  icon: string;
}

export interface Region {
  id: LocationId;
  name: string;
  emoji: string;
  districts: District[];
}

export interface District {
  id: string;
  name: string;
}

export type ServiceCategory =
  | "all"
  | "unloading"
  | "tractors"
  | "trucks"
  | "concrete"
  | "water";

export type LocationId =
  | "all"
  | "bishkek"
  | "osh"
  | "chui"
  | "issyk-kul"
  | "naryn"
  | "talas"
  | "jalal-abad"
  | "osh-region"
  | "batken"
  | "karakol"
  | "tokmok";

export type DistrictId = string;

export interface SearchFilters {
  searchTerm: string;
  selectedCategory: ServiceCategory;
  selectedLocation: LocationId;
  selectedDistrict?: DistrictId;
}

export interface ServiceFormData {
  name: string;
  category: string;
  description: string;
  ownerName: string;
  contact: string;
  whatsapp: string;
  location: string;
  locationName: string;
  district?: string;
  districtName?: string;
  price: string;
  available: boolean;
  images: File[];
}

export interface User {
  id: string;
  phone: string;
  name?: string;
  isAdmin?: boolean;
}

export interface AdminStats {
  totalUsers: number;
  totalServices: number;
  totalCategories: number;
  servicesByCategory: Record<string, number>;
  activeServices: number;
}

export interface FilterState {
  category: string;
  location: string;
  district: string;
  search: string;
}

export interface Location {
  id: string;
  name: string;
  districts: District[];
}

export type TranslationKey =
  | 'common.appName'
  | 'common.mainDescription'
  | 'common.loading'
  | 'common.addListing'
  | 'common.admin'
  | 'common.backToHome'
  | 'common.search'
  | 'common.searchPlaceholder'
  | 'common.required'
  | 'common.cancel'
  | 'common.kyrgyz'
  | 'common.russian'
  | 'common.contact.title'
  | 'common.contact.description'
  | 'common.contact.addButton'
  | 'common.contact.contactButton'
  | 'common.login'
  | 'common.logout'
  | 'common.editServices'
  | 'common.error'
  | 'common.save'
  | 'filters.category'
  | 'filters.location'
  | 'filters.district'
  | 'filters.selectCategory'
  | 'filters.selectRegion'
  | 'filters.selectDistrict'
  | 'filters.allRegions'
  | 'filters.allDistricts'
  | 'categories.all'
  | 'categories.unloading'
  | 'categories.trucks'
  | 'categories.tractors'
  | 'categories.concrete'
  | 'categories.water'
  | 'locations.all'
  | 'locations.bishkek'
  | 'locations.osh'
  | 'locations.chui'
  | 'locations.issyk-kul'
  | 'locations.naryn'
  | 'locations.talas'
  | 'locations.jalal-abad'
  | 'locations.osh-region'
  | 'locations.batken'
  | 'locations.karakol'
  | 'locations.tokmok'
  | 'services.title'
  | 'services.create'
  | 'services.noServices'
  | 'services.card.noImage'
  | 'services.card.whatsapp'
  | 'services.card.whatsappMessage'
  | 'services.card.copyContact'
  | 'services.card.contactCopied'
  | 'services.card.share'
  | 'services.card.linkCopied'
  | 'services.card.clickToView'
  | 'services.form.title'
  | 'services.form.name'
  | 'services.form.namePlaceholder'
  | 'services.form.description'
  | 'services.form.descriptionPlaceholder'
  | 'services.form.category'
  | 'services.form.price'
  | 'services.form.pricePlaceholder'
  | 'services.form.ownerName'
  | 'services.form.ownerNamePlaceholder'
  | 'services.form.contact'
  | 'services.form.contactPlaceholder'
  | 'services.form.whatsapp'
  | 'services.form.whatsappPlaceholder'
  | 'services.form.images'
  | 'services.form.addImages'
  | 'services.form.maxImages'
  | 'services.form.submit'
  | 'services.form.removeImage'
  | 'services.form.imagesSelected'
  | 'services.form.clearImages'
  | 'services.form.uploadError'
  | 'services.form.uploadSuccess'
  | 'services.form.dragAndDrop'
  | 'services.form.or'
  | 'services.form.browse'
  | 'services.form.fileTypes'
  | 'services.form.fileTooLarge'
  | 'services.form.invalidFileType'
  | 'services.auth.signInTitle'
  | 'services.auth.signInDescription'
  | 'auth.loginTitle'
  | 'auth.loginDescription'
  | 'auth.signupTitle'
  | 'auth.signupDescription'
  | 'auth.login'
  | 'auth.loginSuccess'
  | 'auth.loginError'
  | 'auth.phone'
  | 'auth.phonePlaceholder'
  | 'auth.whatsappLogin'
  | 'auth.whatsappSignup'
  | 'auth.verificationCode'
  | 'auth.verificationCodePlaceholder'
  | 'auth.sendCode'
  | 'auth.resendCode'
  | 'auth.verifyCode'
  | 'auth.noAccount'
  | 'auth.hasAccount'
  | 'auth.register'
  | 'auth.registerSuccess'
  | 'auth.registerError'
  | 'auth.logout'
  | 'auth.logoutSuccess'
  | 'auth.invalidPhone'
  | 'auth.invalidCode'
  | 'auth.codeSent'
  | 'auth.loginToAccess'
  | 'auth.whatsappLoginMessage'
  | 'auth.whatsappSignupMessage'
  | 'auth.name'
  | 'auth.namePlaceholder'
  | 'auth.whatsappCodeSent'
  | 'auth.claimRequestSent'
  | 'auth.signInSuccess'
  | 'admin.title'
  | 'admin.statsError'
  | 'admin.servicesError'
  | 'admin.stats.unavailable'
  | 'admin.stats.totalServices'
  | 'admin.stats.totalCategories'
  | 'admin.stats.activeServices'
  | 'admin.services.title'
  | 'admin.services.deleteConfirm'
  | 'admin.services.noServices'
  | 'admin.services.total'
  | 'admin.services.editingService'
  | 'admin.services.columns.name'
  | 'admin.services.columns.owner'
  | 'admin.services.columns.category'
  | 'admin.services.columns.location'
  | 'admin.services.columns.price'
  | 'admin.services.columns.status'
  | 'admin.services.columns.actions'
  | 'admin.services.actions.edit'
  | 'admin.services.actions.delete'
  | 'admin.services.actions.enable'
  | 'admin.services.actions.disable';

export interface PaginationInfo {
  page: number;
  limit: number;
  total: number;
  pages: number;
}

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  pagination?: PaginationInfo;
}
