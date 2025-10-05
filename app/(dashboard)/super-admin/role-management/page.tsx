"use client";
import { NextPage } from "next";
import Head from "next/head";
import { useState, useMemo, FC } from "react";
import {
  FiSearch,
  FiEdit,
  FiPlus,
  FiChevronDown,
  FiChevronUp,
} from "react-icons/fi";
import { FaBan } from "react-icons/fa";
import { HiDotsHorizontal } from "react-icons/hi";

//-/////////////////////////////////////////////////////////////////////////
// TYPE DEFINITIONS
//-/////////////////////////////////////////////////////////////////////////
type AdminRole = "Super Admin" | "Platform Admin";
type AdminStatus = "Active" | "Inactive";

interface Permission {
  id: string;
  label: string;
  description: string;
}

interface Administrator {
  id: number;
  email: string;
  name: string;
  role: AdminRole;
  status: AdminStatus;
  createdDate: string;
  lastLogin: string;
  permissions: Record<string, boolean>;
}

//-/////////////////////////////////////////////////////////////////////////
// MOCK DATA
//-/////////////////////////////////////////////////////////////////////////

const ALL_PERMISSIONS = {
  userManagement: [
    {
      id: "viewMemberList",
      label: "View Member List",
      description: "Access to browse all member basic information",
    },
    {
      id: "exportMemberData",
      label: "Export Member Data",
      description: "Ability to export member data as CSV or Excel files",
    },
    {
      id: "sendEdmTestEmails",
      label: "Send EDM Test Emails",
      description: "Permission to send test emails to specific members",
    },
  ],
  storeManagement: [
    {
      id: "viewAllB2CStores",
      label: "View All B2C Stores",
      description: "Access to browse all store information on the platform",
    },
    {
      id: "deleteHoldBusinessAccounts",
      label: "Delete/hold business Accounts",
      description: "Permission to change store account activation status",
    },
    {
      id: "viewBusinessAnalytics",
      label: "View Business Analytics",
      description: "Access to revenue, sales and business data reports",
    },
  ],
  systemAdministration: [
    {
      id: "createNewAdministrators",
      label: "Create New Administrators",
      description: "Permission to create new platform administrator accounts",
    },
    {
      id: "editPricingPlans",
      label: "Edit Pricing Plans",
      description: "Ability to modify platform subscription plans and pricing",
    },
    {
      id: "viewAuditLogs",
      label: "View Audit Logs",
      description: "Access to view all system operation records",
    },
  ],
};

const initialAdmins: Administrator[] = [
  {
    id: 1,
    email: "super@admin.com",
    name: "Super Administrator",
    role: "Super Admin",
    status: "Active",
    createdDate: "2023-01-01",
    lastLogin: "2024-01-19 10:00:00",
    permissions: {
      viewMemberList: true,
      exportMemberData: true,
      sendEdmTestEmails: true,
      viewAllB2CStores: true,
      deleteHoldBusinessAccounts: true,
      viewBusinessAnalytics: true,
      createNewAdministrators: true,
      editPricingPlans: true,
      viewAuditLogs: true,
    },
  },
  {
    id: 2,
    email: "john@admin.com",
    name: "John Smith",
    role: "Platform Admin",
    status: "Active",
    createdDate: "2024-01-15",
    lastLogin: "2024-01-19 09:15:00",
    permissions: {
      viewMemberList: true,
      exportMemberData: true,
      sendEdmTestEmails: false,
      viewAllB2CStores: true,
      deleteHoldBusinessAccounts: false,
      viewBusinessAnalytics: true,
      createNewAdministrators: false,
      editPricingPlans: false,
      viewAuditLogs: true,
    },
  },
  {
    id: 3,
    email: "sarah@admin.com",
    name: "Sarah Johnson",
    role: "Platform Admin",
    status: "Inactive",
    createdDate: "2024-01-10",
    lastLogin: "2024-01-12 11:30:00",
    permissions: {
      viewMemberList: true,
      exportMemberData: false,
      sendEdmTestEmails: false,
      viewAllB2CStores: true,
      deleteHoldBusinessAccounts: false,
      viewBusinessAnalytics: false,
      createNewAdministrators: false,
      editPricingPlans: false,
      viewAuditLogs: false,
    },
  },
];

const CreateAdminModal: FC<{ onClose: () => void }> = ({ onClose }) => {
  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-2xl p-8 max-w-lg w-full">
        <h2 className="text-3xl font-bold text-gray-800">
          Create New Platform admin
        </h2>
        <p className="text-gray-500 mt-4">
          Welcome to your SaaS Admin Platform. This page is only for first-time
          system initialization. You will become the platform's Super Admin.
        </p>

        <div className="mt-8 space-y-6">
          <div>
            <label
              htmlFor="fullName"
              className="block text-sm font-medium text-gray-700"
            >
              Full Name
            </label>
            <input
              type="text"
              id="fullName"
              placeholder="Enter full name here"
              className="mt-1 block w-full px-4 py-3 bg-gray-100 border-gray-200 border rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email Address
            </label>
            <input
              type="email"
              id="email"
              defaultValue="bdcalltesting@gmail.com"
              className="mt-1 block w-full px-4 py-3 bg-gray-100 border-gray-200 border rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
        </div>

        <div className="mt-8 flex flex-col sm:flex-row-reverse gap-4">
          <button className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-6 py-3 bg-[#C06EF3] text-base font-medium text-white hover:bg-[#7b24b1] focus:outline-none ">
            Create Administrator
          </button>
          <button
            onClick={onClose}
            type="button"
            className="w-full inline-flex justify-center rounded-md border-2 border-gray-300 shadow-sm px-6 py-3 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

const ToggleSwitch: FC<{ checked: boolean; onChange: () => void }> = ({
  checked,
  onChange,
}) => (
  <button
    onClick={onChange}
    className={`relative inline-flex items-center h-6 rounded-full w-11 transition-colors duration-300 focus:outline-none ${
      checked ? "bg-gray-800" : "bg-gray-300"
    }`}
  >
    <span
      className={`inline-block w-4 h-4 transform bg-white rounded-full transition-transform duration-300 ${
        checked ? "translate-x-6" : "translate-x-1"
      }`}
    />
  </button>
);

const PermissionToggle: FC<{
  permission: Permission;
  isEnabled: boolean;
  onToggle: () => void;
}> = ({ permission, isEnabled, onToggle }) => (
  <div className="flex items-center justify-between py-4">
    <div>
      <h4 className="font-medium text-gray-800">{permission.label}</h4>
      <p className="text-sm text-gray-500">{permission.description}</p>
    </div>
    <ToggleSwitch checked={isEnabled} onChange={onToggle} />
  </div>
);

const PermissionGroup: FC<{
  title: string;
  permissions: Permission[];
  currentPermissions: Record<string, boolean>;
  onPermissionChange: (permissionId: string) => void;
}> = ({ title, permissions, currentPermissions, onPermissionChange }) => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="border rounded-lg overflow-hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex justify-between items-center p-4 bg-gray-50 hover:bg-gray-100"
      >
        <h3 className="font-semibold text-gray-700">{title}</h3>
        {isOpen ? (
          <FiChevronUp className="text-gray-600" />
        ) : (
          <FiChevronDown className="text-gray-600" />
        )}
      </button>
      {isOpen && (
        <div className="divide-y">
          {permissions.map((permission) => (
            <div key={permission.id} className="px-4">
              <PermissionToggle
                permission={permission}
                isEnabled={!!currentPermissions[permission.id]}
                onToggle={() => onPermissionChange(permission.id)}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const AdminPage: NextPage = () => {
  const [admins] = useState<Administrator[]>(initialAdmins);
  const [selectedAdmin, setSelectedAdmin] = useState<Administrator>(
    initialAdmins[1]
  );
  const [currentPermissions, setCurrentPermissions] = useState<
    Record<string, boolean>
  >(initialAdmins[1].permissions);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const filteredAdmins = useMemo(() => {
    // Placeholder for search and filter logic
    return admins;
  }, [admins]);

  const handleSelectAdmin = (admin: Administrator) => {
    setSelectedAdmin(admin);
    setCurrentPermissions(admin.permissions);
    setHasUnsavedChanges(false); // Reset changes when switching user
  };

  const handlePermissionChange = (permissionId: string) => {
    setCurrentPermissions((prev) => ({
      ...prev,
      [permissionId]: !prev[permissionId],
    }));
    if (!hasUnsavedChanges) {
      setHasUnsavedChanges(true);
    }
  };

  return (
    <>
      <Head>
        <title>Administrator Management</title>
      </Head>

      {isModalOpen && (
        <CreateAdminModal onClose={() => setIsModalOpen(false)} />
      )}

      <div className=" min-h-screen">
        <div className="p-4 sm:p-6 lg:p-8 max-w-screen-2xl mx-auto">
          {/* Header */}
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold text-gray-900">
              Administrator List
            </h1>
            <button
              onClick={() => setIsModalOpen(true)}
              className="flex items-center gap-2 px-4 py-2 bg-[#C06EF3] text-white rounded-lg shadow hover:bg-gray-800 transition-colors"
            >
              <FiPlus />
              Create New Administrator
            </button>
          </div>

          {/* Main Content */}
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Left Column: Admin List */}
            <div className="lg:w-2/5 bg-white p-6 rounded-lg shadow">
              <div className="flex flex-col sm:flex-row gap-4 mb-4">
                <div className="relative flex-grow">
                  <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search name or email..."
                    className="w-full pl-10 pr-4 py-2 border rounded-md bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
                <select className="border rounded-md py-2 px-4 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500">
                  <option>All Roles</option>
                  <option>Super Admin</option>
                  <option>Platform Admin</option>
                </select>
              </div>
              <div className="text-right mb-4 text-sm font-semibold text-gray-500 tracking-wider">
                {filteredAdmins.length} ACCOUNTS
              </div>

              {/* Admin Table */}
              <div className="space-y-2">
                <div className="hidden md:grid grid-cols-10 gap-4 px-4 py-2 text-sm font-semibold text-gray-500">
                  <div className="col-span-4">Email / Name</div>
                  <div className="col-span-2">Role</div>
                  <div className="col-span-2">Status</div>
                  <div className="col-span-2 text-center">Actions</div>
                </div>
                {filteredAdmins.map((admin) => (
                  <div
                    key={admin.id}
                    onClick={() => handleSelectAdmin(admin)}
                    className={`grid grid-cols-1 md:grid-cols-10 gap-4 items-center p-4 rounded-lg cursor-pointer transition-colors ${
                      selectedAdmin.id === admin.id
                        ? "bg-indigo-50 border-2 border-indigo-400"
                        : "hover:bg-gray-100 border-2 border-transparent"
                    }`}
                  >
                    <div className="col-span-1 md:col-span-4">
                      <p className="font-medium text-gray-800">{admin.email}</p>
                      <p className="text-sm text-gray-500">{admin.name}</p>
                    </div>
                    <div className="col-span-1 md:col-span-2">
                      <span
                        className={`px-3 py-1 text-xs font-semibold rounded-full ${
                          admin.role === "Super Admin"
                            ? "bg-gray-900 text-white"
                            : "bg-gray-200 text-gray-700"
                        }`}
                      >
                        {admin.role}
                      </span>
                    </div>
                    <div className="col-span-1 md:col-span-2">
                      <span
                        className={`inline-flex items-center gap-2 px-3 py-1 text-xs font-semibold rounded-full ${
                          admin.status === "Active"
                            ? "bg-green-100 text-green-800"
                            : "bg-gray-200 text-gray-700"
                        }`}
                      >
                        <HiDotsHorizontal /> {admin.status}
                      </span>
                    </div>
                    <div className="col-span-1 md:col-span-2 flex items-center justify-center gap-4">
                      <button className="text-gray-500 hover:text-indigo-600">
                        <FiEdit size={18} />
                      </button>
                      <button className="text-gray-500 hover:text-red-600">
                        <FaBan size={16} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Column: Permission Settings */}
            <div className="lg:w-3/5">
              <div className="bg-white p-6 rounded-lg shadow">
                <div className="flex justify-between items-center mb-6 border-b pb-4">
                  <h2 className="text-xl font-bold text-gray-800">
                    Permission Settings - {selectedAdmin.name}
                  </h2>
                  {hasUnsavedChanges && (
                    <span className="px-3 py-1 text-sm font-semibold text-yellow-800 bg-yellow-100 rounded-full">
                      Unsaved Changes
                    </span>
                  )}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-sm mb-8">
                  <div>
                    <p className="text-gray-500">Email:</p>
                    <p className="font-medium text-gray-800">
                      {selectedAdmin.email}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-500">Created Date:</p>
                    <p className="font-medium text-gray-800">
                      {selectedAdmin.createdDate}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-500">Last Login:</p>
                    <p className="font-medium text-gray-800">
                      {selectedAdmin.lastLogin}
                    </p>
                  </div>
                </div>

                <div className="space-y-4">
                  <PermissionGroup
                    title="User Management Permissions"
                    permissions={ALL_PERMISSIONS.userManagement}
                    currentPermissions={currentPermissions}
                    onPermissionChange={handlePermissionChange}
                  />
                  <PermissionGroup
                    title="Store Management Permissions"
                    permissions={ALL_PERMISSIONS.storeManagement}
                    currentPermissions={currentPermissions}
                    onPermissionChange={handlePermissionChange}
                  />
                  <PermissionGroup
                    title="System Administration Permissions"
                    permissions={ALL_PERMISSIONS.systemAdministration}
                    currentPermissions={currentPermissions}
                    onPermissionChange={handlePermissionChange}
                  />
                </div>
              </div>
              <button className="w-full mt-6 px-6 py-3 bg-[#C06EF3] text-white font-semibold rounded-lg shadow hover:bg-[#a333e9] transition-colors focus:outline-none ">
                Save Permission Settings
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminPage;
