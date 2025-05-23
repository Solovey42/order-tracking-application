CREATE FUNCTION dbo.GetClientDailyPayments
(
    @ClientId BIGINT,
    @StartDate DATE,
    @EndDate DATE
)
RETURNS TABLE
AS
RETURN
(
    WITH Numbers AS (
        -- Генерация последовательности чисел равное количеству дней
        SELECT TOP (DATEDIFF(DAY, @StartDate, @EndDate) + 1)
            ROW_NUMBER() OVER (ORDER BY (SELECT NULL)) - 1 AS n
        FROM sys.all_objects
    ),
    DateRange AS (
        SELECT DATEADD(DAY, n, @StartDate) AS Dt
        FROM Numbers
    )
    SELECT
        D.Dt,
        ISNULL(SUM(P.Amount), 0) AS SumAmount
    FROM
        DateRange D
        LEFT JOIN ClientPayments P
            ON P.ClientId = @ClientId
            AND CAST(P.Dt AS DATE) = D.Dt
    GROUP BY D.Dt
);