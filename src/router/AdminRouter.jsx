import PageTitle from "@/components/PageTitle";
import DefaultLayout from "@/layouts/DefaultLayout";
import { AcademicClasses } from "@/pages/AcademicClass";
import { Dashboard } from "@/pages/Dashboard";
import { Designations } from "@/pages/Designation";
import { CreateFee, Fees } from "@/pages/Fee";
import { FeeHeads } from "@/pages/FeeHead";
import { FiscalYears } from "@/pages/FiscalYear";
import { IncomeGroups } from "@/pages/IncomeGroup";
import { Riders } from "@/pages/Rider";
import { Schools } from "@/pages/School";
import { Settings } from "@/pages/Settings";
import { Slots } from "@/pages/Slot";
import { Profile } from "@/pages/User";
import { UserInitialValues } from "@/pages/UserInitialValue";
import { Vehicles } from "@/pages/Vehicle";

import { Navigate, Route, Routes } from "react-router";
const AdminRouter = () => {
  return (
    <Routes>
      <Route index element={<Navigate to="/admin" />} />
      <Route path="/dashboard" element={<Navigate to="/admin/dashboard" />} />
      <Route path="/admin" element={<DefaultLayout />}>
        <Route index element={<Navigate to="/admin/dashboard" />} />

        <Route
          path="profile"
          element={
            <>
              <PageTitle title="Profile  " />
              <Profile />
            </>
          }
        />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="riders" element={<Riders />} />
        <Route path="vehicles" element={<Vehicles />} />
        <Route path="fees">
          <Route index element={<Fees />} />
          <Route path="collection" element={<CreateFee />} />
        </Route>

        <Route path="settings">
          <Route index element={<Settings />} />
          <Route path="schools" element={<Schools />} />
          <Route path="riders" element={<Riders />} />
          <Route path="vehicles" element={<Vehicles />} />
          <Route path="time_slots" element={<Slots />} />

          <Route path="designations" element={<Designations />} />

          <Route path="academic_classes" element={<AcademicClasses />} />

          <Route path="fiscal_years" element={<FiscalYears />} />
          <Route path="income_groups" element={<IncomeGroups />} />
          <Route path="fee_heads" element={<FeeHeads />} />
          {/* <Route path='expense_groups' element={<ExpenseGroups />} />
                    <Route path='expense_groups' element={<ExpenseGroups />} />
                    <Route path='fee_heads' element={<FeeHeads />} />
                    <Route path='expense_heads' element={<ExpenseHeads />} />
                    <Route path='fee_templates' element={<FeeTemplates />} />

                    <Route path='documents' element={<Documents />} /> */}
          <Route path="user_initial_values" element={<UserInitialValues />} />
          <Route path="key_values" element={<div />} />
        </Route>


        {/* <Route path="*" element={<Navigate to="/dashboard" />} /> */}
      </Route>
      {/* <Route path="*" element={<Navigate to="/admin/dashboard" />} /> */}
    </Routes>
  );
};

export default AdminRouter;
