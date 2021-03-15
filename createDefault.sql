CREATE DATABASE IF NOT EXISTS naveteam;
use naveteam;

CREATE TABLE `navers` (
  `id` int(11) NOT NULL,
  `name` varchar(45) DEFAULT NULL,
  `job_role` varchar(45) DEFAULT NULL,
  `birthdate` date DEFAULT NULL,
  `admission_date` date DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE `projects` (
  `id` int(11) NOT NULL,
  `name` varchar(45) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;


CREATE TABLE `projects_navers` (
  `id` int(11) NOT NULL,
  `project_id` int(11) DEFAULT NULL,
  `naver_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

ALTER TABLE `navers`
  ADD PRIMARY KEY (`id`);
ALTER TABLE `projects`
  ADD PRIMARY KEY (`id`);
ALTER TABLE `projects_navers`
  ADD PRIMARY KEY (`id`),
  ADD KEY `projects_navers_FK` (`naver_id`),
  ADD KEY `projects_navers_FK_1` (`project_id`);
ALTER TABLE `navers`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=175;
ALTER TABLE `projects`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=49;
ALTER TABLE `projects_navers`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=147;

ALTER TABLE `projects_navers`
  ADD CONSTRAINT `projects_navers_FK` FOREIGN KEY (`naver_id`) REFERENCES `navers` (`id`),
  ADD CONSTRAINT `projects_navers_FK_1` FOREIGN KEY (`project_id`) REFERENCES `projects` (`id`);
COMMIT;
show tables;
