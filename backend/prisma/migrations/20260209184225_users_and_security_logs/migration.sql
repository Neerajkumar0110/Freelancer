-- CreateTable
CREATE TABLE `users` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `full_name` VARCHAR(100) NOT NULL,
    `email` VARCHAR(100) NOT NULL,
    `password` VARCHAR(255) NOT NULL,
    `role` ENUM('client', 'freelancer') NOT NULL,
    `is_verified` BOOLEAN NULL DEFAULT false,
    `created_at` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NULL,
    `reset_otp` VARCHAR(255) NULL,
    `reset_otp_expiry` DATETIME(3) NULL,
    `otp_attempts` INTEGER NULL DEFAULT 0,
    `otp_verified` BOOLEAN NULL DEFAULT false,
    `otp_last_sent_at` DATETIME(3) NULL,
    `otp_resend_count` INTEGER NULL DEFAULT 0,
    `otp_resend_date` DATE NULL,

    UNIQUE INDEX `users_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `security_logs` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `email` VARCHAR(255) NULL,
    `action` VARCHAR(100) NULL,
    `ip_address` VARCHAR(50) NULL,
    `user_agent` VARCHAR(191) NULL,
    `created_at` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
