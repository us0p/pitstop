-- CreateTable
CREATE TABLE "VehicleMessageOutbox" (
    "id" SERIAL NOT NULL,
    "action" TEXT NOT NULL,
    "vehicledata" TEXT NOT NULL,

    CONSTRAINT "VehicleMessageOutbox_pkey" PRIMARY KEY ("id")
);
