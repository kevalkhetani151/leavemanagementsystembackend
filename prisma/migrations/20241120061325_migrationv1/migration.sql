-- CreateTable
CREATE TABLE `User` (
    `user_id` INTEGER NOT NULL AUTO_INCREMENT,
    `first_name` VARCHAR(191) NOT NULL,
    `last_name` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `salt` VARCHAR(191) NOT NULL,
    `role` VARCHAR(191) NOT NULL DEFAULT 'employee',
    `departmentId` INTEGER NULL,
    `designation` VARCHAR(191) NULL,
    `hire_date` DATETIME(3) NOT NULL,
    `leave_balance` INTEGER NOT NULL DEFAULT 0,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `User_email_key`(`email`),
    UNIQUE INDEX `User_salt_key`(`salt`),
    PRIMARY KEY (`user_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `LeaveRequest` (
    `leave_request_id` INTEGER NOT NULL AUTO_INCREMENT,
    `user_id` INTEGER NOT NULL,
    `leave_type_id` INTEGER NOT NULL,
    `start_date` DATETIME(3) NOT NULL,
    `end_date` DATETIME(3) NOT NULL,
    `leave_days` INTEGER NOT NULL,
    `status` VARCHAR(191) NOT NULL DEFAULT 'pending',
    `reason` VARCHAR(191) NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `isUnpaid` BOOLEAN NOT NULL DEFAULT false,

    PRIMARY KEY (`leave_request_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `UnpaidLeave` (
    `approved_leave_id` INTEGER NOT NULL AUTO_INCREMENT,
    `leave_request_id` INTEGER NOT NULL,
    `approved_by` INTEGER NOT NULL,
    `approved_date` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `remarks` VARCHAR(191) NULL,
    `isUnpaid` BOOLEAN NOT NULL DEFAULT false,

    UNIQUE INDEX `UnpaidLeave_leave_request_id_key`(`leave_request_id`),
    PRIMARY KEY (`approved_leave_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Department` (
    `department_id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`department_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `LeaveType` (
    `leave_type_id` INTEGER NOT NULL AUTO_INCREMENT,
    `leave_type` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`leave_type_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `User` ADD CONSTRAINT `User_departmentId_fkey` FOREIGN KEY (`departmentId`) REFERENCES `Department`(`department_id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `LeaveRequest` ADD CONSTRAINT `LeaveRequest_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `User`(`user_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `LeaveRequest` ADD CONSTRAINT `LeaveRequest_leave_type_id_fkey` FOREIGN KEY (`leave_type_id`) REFERENCES `LeaveType`(`leave_type_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UnpaidLeave` ADD CONSTRAINT `UnpaidLeave_leave_request_id_fkey` FOREIGN KEY (`leave_request_id`) REFERENCES `LeaveRequest`(`leave_request_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UnpaidLeave` ADD CONSTRAINT `UnpaidLeave_approved_by_fkey` FOREIGN KEY (`approved_by`) REFERENCES `User`(`user_id`) ON DELETE RESTRICT ON UPDATE CASCADE;
